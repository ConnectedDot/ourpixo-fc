import Fuse from "fuse.js"
import type { DriveFile } from "./drive"

export function createSearch(files: DriveFile[]) {

    const fuse = new Fuse(files, {
        keys: ["name"],
        threshold: 0.3
    })

    return function search(q: string) {

        if (!q) return files

        return fuse.search(q).map(r => r.item)
    }

}