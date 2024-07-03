import { zip } from "./zip";

export const formatMessage = (str: TemplateStringsArray, ...expressions: any) => {
  const string = [...zip(str, expressions)]
    .map((item: any[]) => item.join(''))
    .join('')
    .trim()
    .replace(/^ +/gm, "");

  return string;
}