import { readFile as fsReadFile, writeFile as fsWriteFile, mkdir, rm } from 'fs/promises';
export async function readFile(path, encoding = 'utf-8') {
    return fsReadFile(path, { encoding });
}
export async function writeFile(path, content) {
    await fsWriteFile(path, content, { encoding: 'utf-8' });
}
export async function updateFile(path, updater) {
    const content = await readFile(path);
    await writeFile(path, updater(content));
}
export async function ensureDir(dirPath) {
    await mkdir(dirPath, { recursive: true });
}
export async function removeFile(path) {
    await rm(path, { force: true });
}
//# sourceMappingURL=fs.js.map