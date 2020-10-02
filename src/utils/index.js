/**
 * Calculate points
 *  - 4 letter words = 1 pt
 *  - Every letter after is +1 pt
 *  - If all 7 letters are used ("pangram"), +7pts
 *
 * @param  {[String]} array of words (or single word)
 * @return {Number} points
 */
export const calcPoints = (words) => words.reduce((totalPoints, word) => {
  let wordPoints = word.length - 3;
  if (isPangram(word)) {
    wordPoints += 7;
  }
  return totalPoints += wordPoints;
}, 0);

export const isPangram = (word) => {
  return new Set(word.split('')).size === 7;
}
