// api/drive/list.ts
import { google } from 'googleapis';

function getAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL!;
  let key = process.env.GOOGLE_PRIVATE_KEY!;
  key = key.replace(/\\n/g, '\n');
  return new google.auth.JWT(email, undefined, key, ['https://www.googleapis.com/auth/drive.readonly']);
}

function sanitizeFolderId(id?: string) {
  return (id || process.env.DRIVE_ROOT_FOLDER_ID || '').trim();
}

export default async function handler(req: any, res: any) {
  try {
    const folderId = sanitizeFolderId(req.query.folderId as string | undefined);
    if (!folderId) return res.status(400).json({ error: 'Missing folderId' });

    const pageSize = Math.min(Number(req.query.pageSize || 48), 200); // cap
    const pageToken = (req.query.pageToken as string) || undefined;

    const auth = getAuth();
    const drive = google.drive({ version: 'v3', auth });

    const folderQuery = `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    const fileQuery = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;

    // Get subfolders (not paged – typically small)
    const foldersResp = await drive.files.list({
      q: folderQuery,
      fields: 'files(id,name,iconLink)'
    });

    // Get files (paged)
    const filesResp = await drive.files.list({
      q: fileQuery,
      orderBy: 'createdTime desc',
      pageSize,
      pageToken,
      fields: 'nextPageToken, files(id,name,mimeType,thumbnailLink,webViewLink,createdTime)'
    });

    const folders = (foldersResp.data.files || []).map(f => ({
      id: f.id!, name: f.name!, icon: (f as any).iconLink || null
    }));

    const files = (filesResp.data.files || []).map(f => {
      const id = f.id!;
      // NOTE: viewUrl & downloadUrl will be overridden on the client to use /api/drive/image
      return {
        id,
        name: f.name!,
        mimeType: f.mimeType!,
        thumb: (f as any).thumbnailLink || null,
        viewUrl: `https://drive.google.com/uc?id=${id}`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
        webViewLink: f.webViewLink || null,
        createdTime: (f as any).createdTime || null
      };
    });

    const ttl = Number(process.env.DRIVE_CACHE_TTL || 300);
    res.setHeader('Cache-Control', `public, s-maxage=${ttl}, stale-while-revalidate=${ttl}`);
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json({
      folderId,
      folders,
      files,
      nextPageToken: filesResp.data.nextPageToken || null
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
}