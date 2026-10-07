// api/drive/thumb.ts
import { google } from "googleapis";
import { getDriveAuth } from "./auth";
import Sharp from "sharp";




export default async function handler(req: any, res: any) {
    try {
        const id = (req.query.id as string) || "";
        const width = Number(req.query.w || 350);  // Default thumb width

        if (!id) return res.status(400).send("Missing id");

        const auth = getDriveAuth();
        const drive = google.drive({ version: "v3", auth });

        // Fetch raw file stream
        const fileStream = await drive.files.get(
            { fileId: id, alt: "media" },
            { responseType: "stream" }
        );

        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000");

        // Pipe through Sharp to optimize & resize
        const transformer = Sharp()
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .jpeg({ quality: 65 });

        fileStream.data.pipe(transformer).pipe(res);

        fileStream.data.on("error", (err: any) => {
            console.error("Drive stream error:", err);
            res.status(500).end("Stream error");
        });

    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err?.message || "Server error" });
    }
}