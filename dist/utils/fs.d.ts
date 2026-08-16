export declare function readFile(path: string, encoding?: BufferEncoding): Promise<string>;
export declare function writeFile(path: string, content: string): Promise<void>;
export declare function updateFile(path: string, updater: (content: string) => string): Promise<void>;
export declare function ensureDir(dirPath: string): Promise<void>;
export declare function removeFile(path: string): Promise<void>;
//# sourceMappingURL=fs.d.ts.map