import { bufferToFile, fileToBuffer, print } from "kolmafia";

export enum LogLevel {
  Debug,
  Info,
  Warn,
  Error,
}

export class Logger {
  private static fileName: string = getLogFilename();
  private static lines: string[] = fileToBuffer(Logger.fileName).split("\n");

  public static debug(msg: string) {
    Logger.log(LogLevel.Debug, msg);
  }

  public static info(msg: string) {
    Logger.log(LogLevel.Info, msg);
  }

  public static warn(msg: string) {
    Logger.log(LogLevel.Warn, msg);
  }

  public static error(msg: string) {
    Logger.log(LogLevel.Error, msg);
  }

  private static log(level: LogLevel, msg: string) {
    const logMsg = genLogMessage(level, msg);
    print(logMsg);
    this.lines.push(logMsg);
    bufferToFile(Logger.lines.join("\n"), Logger.fileName);
  }
}

function genLogMessage(level: LogLevel, msg: string): string {
  return `[${LogLevel[level].toUpperCase()}] ${new Date().toISOString().split(".")[0].replace("T", " ")}: ${msg}`;
}

function getLogFilename(): string { 
  return `gblog/gb_log_${new Date().toISOString().split("T")[0].replace(/-/g, "_")}.txt`; 
}
