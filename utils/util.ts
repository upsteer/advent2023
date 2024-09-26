import * as fs from 'node:fs';
import * as path from 'node:path';

function GetContents(filepath :string, isTest: boolean) :string[] {
  
  if (!isTest) {
    filepath = "test/" + filepath + ".txt";
  } else {
    filepath = "live/" + filepath + ".txt";
  }
  const filePath = path.resolve(filepath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split(/\r?\n/);
  const formattedLines : string[] = [];
  for (const line of lines) {
    if (line !== "" ){
      formattedLines.push(line);
    }
  }
  return formattedLines;
}

export {GetContents};
