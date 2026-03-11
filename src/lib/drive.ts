
// export type DriveFile = {
//   id: string
//   name: string
//   mimeType: string
//   thumb?: string | null
//   viewUrl: string
//   downloadUrl: string
//   webViewLink?: string | null
// }

// export type DriveFolder = { id: string; name: string; icon?: string | null }

// export type DrivePayload = {
//   folderId: string
//   folders: DriveFolder[]
//   files: DriveFile[]
// }

// export async function listDrive(folderId?: string): Promise<DrivePayload> {
//   const url = folderId ? `/api/drive/list?folderId=${folderId}` : `/api/drive/list`
//   const r = await fetch(url)
//   if (!r.ok) throw new Error(`Drive list failed: ${r.status}`)
//   return await r.json()
// }





// src/lib/drive.ts

// export type DriveFile = {
//   id: string;
//   name: string;
//   mimeType: string;
//   thumb?: string | null;   // proxied thumb url we'll set below
//   viewUrl: string;         // proxied full image url
//   downloadUrl: string;     // can keep drive download or also proxy
//   webViewLink?: string | null;
// };

// export type DriveFolder = { id: string; name: string; icon?: string | null };

// export type DrivePayload = {
//   folderId: string;
//   folders: DriveFolder[];
//   files: DriveFile[];
// };

// export async function listDrive(folderId?: string): Promise<DrivePayload> {
//   const url = folderId ? `/api/drive/list?folderId=${folderId}` : `/api/drive/list`;
//   const r = await fetch(url);
//   if (!r.ok) throw new Error(`Drive list failed: ${r.status}`);
//   const data: DrivePayload = await r.json();

//   // IMPORTANT: Build URLs that go through YOUR backend proxy.
//   // This avoids Google Drive permission issues in the browser.
//   data.files = data.files.map((f) => {
//     const proxied = `/api/drive/image?id=${f.id}`;
//     return {
//       ...f,
//       viewUrl: proxied,          // lightbox image source
//       thumb: proxied,            // grid thumbnail (simple, same as full for now)
//       // If you want downloads to also go through the backend, uncomment next line:
//       // downloadUrl: proxied,
//       downloadUrl: f.downloadUrl // or keep original direct download if public
//     };
//   });

//   return data;
// }



// src/lib/drive.ts

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumb?: string | null;
  viewUrl: string;
  downloadUrl?: string;
  webViewLink?: string | null;
  createdTime?: string | null;
  blurDataURL?: string;
};


export type DriveFolder = { id: string; name: string; icon?: string | null };

export type DrivePayload = {
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
    const thumbUrl = `/api/drive/thumb?id=${f.id}&w=350`;
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