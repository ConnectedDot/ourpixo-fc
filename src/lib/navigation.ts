import type { DriveFolder } from './drive';

export type FolderCrumb = Pick<DriveFolder, 'id' | 'name'>;

const PATH_KEY = 'path';

export function readFolderPath(): FolderCrumb[] {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get(PATH_KEY);
  if (!raw) return [];
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(raw)));
    if (!Array.isArray(decoded)) return [];
    return decoded.filter((item): item is FolderCrumb => Boolean(item?.id && item?.name));
  } catch {
    return [];
  }
}

export function pathToUrl(path: FolderCrumb[]) {
  const url = new URL(window.location.href);
  if (path.length) {
    url.searchParams.set(PATH_KEY, btoa(encodeURIComponent(JSON.stringify(path))));
  } else {
    url.searchParams.delete(PATH_KEY);
  }
  url.searchParams.delete('photo');
  return `${url.pathname}${url.search}${url.hash}`;
}

export function writeFolderPath(path: FolderCrumb[], mode: 'push' | 'replace' = 'push') {
  const url = pathToUrl(path);
  window.history[mode === 'push' ? 'pushState' : 'replaceState']({ path }, '', url);
}

export function folderShareUrl(path: FolderCrumb[]) {
  return new URL(pathToUrl(path), window.location.origin).toString();
}

export function photoShareUrl(fileId: string) {
  const url = new URL(window.location.href);
  url.searchParams.set('photo', fileId);
  return url.toString();
}
