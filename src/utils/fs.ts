import { readFile as fsReadFile, writeFile as fsWriteFile, mkdir, rm } from 'fs/promises';

export async function readFile(path: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
    return fsReadFile(path, { encoding });
}

export async function writeFile(path: string, content: string): Promise<void> {
    await fsWriteFile(path, content, { encoding: 'utf-8' });
}

export async function updateFile(
    path: string,
    updater: (content: string) => string
): Promise<void> {
    const content = await readFile(path);
    await writeFile(path, updater(content));
}

export async function ensureDir(dirPath: string): Promise<void> {
    await mkdir(dirPath, { recursive: true });
}

export async function removeFile(path: string): Promise<void> {
    await rm(path, { force: true });
}
