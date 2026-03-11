// src/lib/drive.ts
export type DriveFile = {
  id: string
  name: string
  mimeType: string
  thumb?: string | null
  viewUrl: string
  downloadUrl: string
  webViewLink?: string | null
  createdTime?: string | null
  dominantColor?: string
}

export type DriveFolder = { id: string; name: string; icon?: string | null };

export type DrivePayload = {
  json(): any
  folderId: string;
  folders: DriveFolder[];
  files: DriveFile[];
  nextPageToken?: string | null;
};

export async function listDrive(
  folderId?: string,
  pageToken?: string,
  pageSize = 48
): Promise<DrivePayload> {

  const params = new URLSearchParams();
  if (folderId) params.set("folderId", folderId);
  if (pageToken) params.set("pageToken", pageToken);
  params.set("pageSize", String(pageSize));

  const url = `/api/drive/list?${params.toString()}`;

  const r = await fetch(url);
  if (!r.ok) throw new Error(`Drive list failed: ${r.status}`);

  const data: DrivePayload = await r.json();

  // Build proxied thumbnail + full-view URLs
  data.files = data.files.map((f) => {
    const thumbUrl = `/api/drive/thumb?id=${f.id}&w=400`;
    const fullUrl = `/api/drive/image?id=${f.id}`;
    return {
      ...f,
      thumb: thumbUrl,
      viewUrl: fullUrl,
      // Optionally proxy downloads too:
      // downloadUrl: fullUrl,
      downloadUrl: f.downloadUrl,
    };
  });

  return data;
}