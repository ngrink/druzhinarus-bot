export const getWordWithEnding = (n: number, word: string, endings: string[]): string => {
  const lastDigit = n % 10

  if (lastDigit === 1 && n % 100 !== 11) {
    return word + endings[0]
  }

  if (lastDigit >= 2 && lastDigit <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    return word + endings[1]
  }

  return word + endings[2]
}