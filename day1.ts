import { GetContents } from "./utils/util.ts";


const HashMap = new Map<string, number>();
HashMap.set("zero", 0);
HashMap.set("one", 1);
HashMap.set("two", 2);
HashMap.set("three", 3);
HashMap.set("four", 4);
HashMap.set("five", 5);
HashMap.set("six", 6);
HashMap.set("seven", 7);
HashMap.set("eight", 8);
HashMap.set("nine", 9);

const NumHashMap = new Map<string, number>();
NumHashMap.set("0", 0);
NumHashMap.set("1", 1);
NumHashMap.set("2", 2);
NumHashMap.set("3", 3);
NumHashMap.set("4", 4);
NumHashMap.set("5", 5);
NumHashMap.set("6", 6);
NumHashMap.set("7", 7);
NumHashMap.set("8", 8);
NumHashMap.set("9", 9);

interface SpelledNumberData {
  Min: number;
  Max: number;
  MinSpelled: string;
  MaxSpelled: string;
}

const data = GetContents("day1", true);

function GetSimpleSum(): number {
  const numList: number[] = [];
  for (const line of data) {
    let numstr: string = "";
    for (const char of line) {
      const num = parseInt(char);
      if (num) {
        numstr += char;
      }
    }
    numstr = numstr[0] + numstr[numstr.length - 1];
    numList.push(parseInt(numstr));
  }

  let sum = 0;
  for (const num of numList) {
    sum += num;
  }
  return sum;
}

console.log("Part 1 sum is", GetSimpleSum());

function FindMaxMinNumbers(
  line: string,
  hashmap: Map<string, number>
): SpelledNumberData {
  const FirstMatch = new Map<string, number>();
  const LastMatch = new Map<string, number>();
  hashmap.forEach((_, key) => {
    if (line.includes(key)) {
      FirstMatch.set(key, line.indexOf(key));
      LastMatch.set(key, line.lastIndexOf(key));
    }
  });
  let MinPlace = line.length - 1;
  let MaxPlace = 0;
  let MinSpelled = "";
  let MaxSpelled = "";

  for (const key of FirstMatch.keys()) {
    const place = FirstMatch.get(key) || 0;
    if (place <= MinPlace) {
      MinPlace = place;
      MinSpelled = key;
    }
    if (place >= MaxPlace) {
      MaxPlace = place;
      MaxSpelled = key;
    }
  }

  for (const key of LastMatch.keys()) {
    const place = LastMatch.get(key) || 0;
    if (place <= MinPlace) {
      MinPlace = place;
      MinSpelled = key;
    }
    if (place >= MaxPlace) {
      MaxPlace = place;
      MaxSpelled = key;
    }
  }

  const spellednumberdata = {
    Min: MinPlace,
    Max: MaxPlace,
    MinSpelled: MinSpelled,
    MaxSpelled: MaxSpelled,
  };

  return spellednumberdata;
}

function GetComplexSum(): number {
  const NumberList: string[] = [];
  for (const line of data) {
    console.log("line", line);
    const SpelledNumberMap = FindMaxMinNumbers(line, HashMap);

    const NumberData = FindMaxMinNumbers(line, NumHashMap);

    let FinalNumber = "";
    if (SpelledNumberMap.Min < NumberData.Min) {
      FinalNumber += HashMap.get(SpelledNumberMap.MinSpelled);
    } else {
      FinalNumber += NumberData.MinSpelled;
    }

    if (SpelledNumberMap.Max > NumberData.Max) {
      FinalNumber += HashMap.get(SpelledNumberMap.MaxSpelled);
    } else {
      FinalNumber += NumberData.MaxSpelled;
    }
    console.log("FinalNumber", FinalNumber);
    NumberList.push(FinalNumber);
    console.log("\n");
  }

  let sum = 0;
  for (const num of NumberList) {
    const parsesNum = parseInt(num);
    if (parsesNum) {
      sum += parsesNum;
    } else {
      console.log("Error parsing number");
    }
  }

  return sum;
}

console.log("Part 2 sum is", GetComplexSum());
