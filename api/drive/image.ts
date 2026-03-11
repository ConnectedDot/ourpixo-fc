// api/drive/image.ts
import { google } from "googleapis";

function getAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL!;
  let key = process.env.GOOGLE_PRIVATE_KEY!;
  key = key.replace(/\\n/g, "\n");
  return new google.auth.JWT(email, undefined, key, [
    "https://www.googleapis.com/auth/drive.readonly",
  ]);
}

// export default async function handler(req: any, res: any) {
//   try {
//     const id = (req.query.id as string) || "";
//     if (!id) return res.status(400).send("Missing id");

//    const auth = getAuth();
//     const drive = google.drive({ version: "v3", auth });


//     // Inside handler
//     const meta = await drive.files.get({ fileId: id, fields: "name, mimeType" });
//     const fileName = meta.data.name || "download.jpg";

//     res.setHeader("Content-Type", meta.data.mimeType || "image/jpeg");
//     // THIS LINE FORCES THE DOWNLOAD:
//     res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

//     const resp = await drive.files.get({ fileId: id, alt: "media" }, { responseType: "stream" });
//     resp.data.pipe(res);



//     // Fetch file metadata to set Content-Type and name
//     // const meta = await drive.files.get({
//     //   fileId: id,
//     //   fields: "mimeType, name",
//     //   alt: undefined,
//     // });

//     // Stream the file bytes
//     // const resp = await drive.files.get(
//     //   { fileId: id, alt: "media" },
//     //   { responseType: "stream" }
//     // );

//     const contentType = meta.data.mimeType || "application/octet-stream";
//     res.setHeader("Content-Type", contentType);
//     // Cache a bit on the edge and the browser
//     res.setHeader("Cache-Control", "public, s-maxage=600, max-age=300");

//     // Pipe Google stream to client
//     resp.data.on("error", (e: any) => {
//       console.error("Drive stream error:", e);
//       res.status(500).end("Stream error");
//     });
//     resp.data.pipe(res);
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ error: err?.message || "Server error" });
//   }
// }


// api/drive/image.ts
// ... (keep your auth logic)

export default async function handler(req: any, res: any) {
  try {
    const id = (req.query.id as string) || "";
    const download = req.query.download === "true"; // New check

    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });

    const meta = await drive.files.get({ fileId: id, fields: "name, mimeType" });
    const fileName = meta.data.name || "faith-city-media.jpg";

    res.setHeader("Content-Type", meta.data.mimeType || "image/jpeg");

    if (download) {
      // This is the key line for the "Direct Download" UX
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    } else {
      res.setHeader("Cache-Control", "public, s-maxage=3600");
    }

    const resp = await drive.files.get(
      { fileId: id, alt: "media" },
      { responseType: "stream" }
    );

    resp.data.pipe(res);
  } catch (err: any) {
    res.status(500).send("Download failed");
  }
}