import { PathLike } from "fs";
import { FileHandler } from "./FileHandler";
import fs from "fs";
import { pathToHTTPList } from "./Paths";

export class FileHandlerChecker {
  constructor(private readonly FileHandler: FileHandler) {}

  writeFile(path: PathLike, data: string) {
    const readFile = this.FileHandler.readFile(path);
    if (!readFile) {
      this.FileHandler.writeFile(path, data);
      return;
    }
    this.appendFile(path, data);
    return;
  }

  private appendFile(path: PathLike, data: string) {
    const newLine = "\n";
    fs.promises.appendFile(path, newLine + data);
  }
}
