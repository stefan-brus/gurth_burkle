export function parseArguments(argv: string[]): Arguments {
  const result: Arguments = { 
    flagArgs: [],
    valueArgs: new Map(),
  };
  let valueExpected = false;
  let lastValueArg = "";

  argv.forEach(arg => {
    if (valueExpected) {
      result.valueArgs.set(lastValueArg, arg);
      valueExpected = false;
    }
    else {
      if (arg.startsWith("--")) {
        valueExpected = true;
        lastValueArg = arg.slice(2);
        if (result.valueArgs.has(lastValueArg)) {
          throw `Value argument ${lastValueArg} given multiple times`;
        }
      }
      else {
        result.flagArgs.push(arg);
      }
    }
  });

  return result;
}

export function printArguments(args: Arguments): string {
  let result = "";

  if (args.flagArgs.length > 0) {
    result += "Flags:<br/>";
    args.flagArgs.forEach(arg => {
      result += `${arg}<br/>`;
    });
    result += "<br/>";
  }

  if (args.valueArgs.size > 0) {
    result += "Value args:<br/>";
    args.valueArgs.forEach((val, key) => {
      result += `${key}: ${val}<br/>`;
    });
    result += "<br/>";
  }

  return result;
}

export type Arguments = {
  flagArgs: string[],
  valueArgs: Map<string, string>,
};
