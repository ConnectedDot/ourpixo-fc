export type DriveFile={id:string;name:string;mimeType:string;thumb?:string|null;highResThumb?:string|null;viewUrl:string;downloadUrl:string;webViewLink?:string|null;createdTime?:string|null;dominantColor?:string};
export type DriveFolder={id:string;name:string;icon?:string|null};
export type DrivePayload={totalCount:number;folderId:string;folders:DriveFolder[];files:DriveFile[];nextPageToken?:string|null};

async function page(folderId?:string,pageToken?:string,pageSize=1000):Promise<DrivePayload>{
 const params=new URLSearchParams();if(folderId)params.set('folderId',folderId);if(pageToken)params.set('pageToken',pageToken);params.set('pageSize',String(pageSize));
 const r=await fetch(`/api/drive/list?${params}`);if(!r.ok){let message=`Drive list failed: ${r.status}`;try{const body=await r.json();if(body?.error)message=body.error}catch{}throw new Error(message)}const data:DrivePayload=await r.json();
 data.files=data.files.map(f=>({...f,thumb:`/api/drive/thumb?id=${f.id}&w=600`,highResThumb:`/api/drive/thumb?id=${f.id}&w=1800`,viewUrl:`/api/drive/image?id=${f.id}`,downloadUrl:f.downloadUrl}));return data;
}

// Loads all Drive pages for an album so large events are not silently capped at 1,000 images.
export async function listDrive(folderId?:string):Promise<DrivePayload>{
 const first=await page(folderId);const files=[...first.files];let token=first.nextPageToken||undefined;let guard=0;
 while(token&&guard<20){const next=await page(folderId,token);files.push(...next.files);token=next.nextPageToken||undefined;guard++;}
 return {...first,files,totalCount:files.length,nextPageToken:token||null};
}
