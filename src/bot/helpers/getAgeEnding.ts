import { getWordWithEnding } from "./getWordWithEnding"

export const getAgeEnding = (age: number) => {
  return getWordWithEnding(age, '', ['год', 'года', 'лет'])
}