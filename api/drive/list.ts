// api/drive/list.ts
import { google } from "googleapis";

function getAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL!;
  let key = process.env.GOOGLE_PRIVATE_KEY!;
  key = key.replace(/\\n/g, "\n");
  return new google.auth.JWT(email, undefined, key, [
    "https://www.googleapis.com/auth/drive.readonly",
  ]);
}

function sanitizeFolderId(id?: string) {
  return (id || process.env.DRIVE_ROOT_FOLDER_ID || "").trim();
}

export default async function handler(req: any, res: any) {
  try {
    const folderId = sanitizeFolderId(req.query.folderId as string | undefined);
    if (!folderId) return res.status(400).json({ error: "Missing folderId" });

    const pageSize = Math.min(Number(req.query.pageSize || 100), 1000); //  changed 200 to 1000 in here also
    const pageToken = req.query.pageToken || undefined;

    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });

    const folderQuery = `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
    const fileQuery = `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`;

    const foldersResp = await drive.files.list({
      q: folderQuery,
      fields: "files(id,name,iconLink)",
    });

    const filesResp = await drive.files.list({
      q: fileQuery,
      orderBy: "createdTime desc",
      pageSize,
      pageToken,
      fields:
        "nextPageToken, files(id,name,mimeType,thumbnailLink,webViewLink,createdTime)",
    });

    const folders = (foldersResp.data.files || []).map((f) => ({
      id: f.id!,
      name: f.name!,
      icon: (f as any).iconLink || null,
    }));

    let totalCount = 0;
    if (!pageToken) {
      const countResp = await drive.files.list({
        q: fileQuery,
        fields: "files(id)", // ONLY fetch IDs to keep it extremely fast
        pageSize: 1000,      // Increase limit to capture the full count in one go
      });
      totalCount = countResp.data.files?.length || 0;
    }



    const files = (filesResp.data.files || []).map((f) => ({
      id: f.id!,
      name: f.name!,
      mimeType: f.mimeType!,
      // Change =s220 to =s600 for a high-quality native Google thumb
      thumb: f.thumbnailLink ? f.thumbnailLink.replace(/=s220$/, "=s600") : null,
      viewUrl: `/api/drive/image?id=${f.id}`,
      downloadUrl: f.webViewLink,
    }));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=300"
    );

    return res.status(200).json({
      folderId,
      folders,
      files,
      totalCount,
      nextPageToken: filesResp.data.nextPageToken || null,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err?.message || "Server error" });
  }
}