import fs, { PathLike } from "fs";

interface IFileHandler {
  readFile(path: PathLike): Promise<string>;
  writeFile(path: PathLike, data: string): void;
}

export class FileHandler implements IFileHandler {
  async readFile(path: PathLike): Promise<string> {
    try {
      const data = await fs.promises.readFile(path, { encoding: "utf8" });
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
  writeFile(path: PathLike, data: string): void {
    try {
      fs.promises.writeFile(path, data);
    } catch (error) {
      throw error;
    }
  }
}
