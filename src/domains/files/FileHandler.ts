import fs, { PathLike } from "fs";

interface IFileHandler {
  readFile(path: PathLike): Promise<string>;
  writeFile(path: PathLike, data: string): Promise<void>;
}

class FileHandler implements IFileHandler {
  readFile(path: PathLike): Promise<string> {
    return fs.promises.readFile(path, { encoding: "utf8" });
  }
  writeFile(path: PathLike, data: string): Promise<void> {
    return fs.promises.writeFile(path, data);
  }
}
