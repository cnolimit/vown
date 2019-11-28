/**
 * @desc  This function will truncate either the front or end of a string.
 * @param  {string} str         String to be truncated
 * @param  {number} frontLen    Number of characters to be remained in front.
 * @param  {number} backLen     Number of characters to be remained at the back.
 * @param  {string} truncateStr String that is replaced the truncated portion
 * @return {string}             Truncated string. Defaults to '&hellip;' if unspecified.
 */
export const truncate = (
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr = '&hellip;'
) => {
  if (str === null) {
    return ''
  }
  const strLen = str.length
  if (frontLen >= strLen || backLen >= strLen || frontLen + backLen >= strLen) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  }
  return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
}

/**
 * @desc truncates any string down to the maximum length
 * with a &hellip; in the middle of the new string.
 * @return {void}
 */
export const truncateMiddle = (str: string, mxLength: number) => {
  if (!str || !mxLength) return ''
  const front = Math.floor((mxLength - 3) / 2)
  const back = Math.floor((mxLength - 3) / 2)
  if (str.length > mxLength) {
    return truncate(str, front, back, '...')
  }
  return str
}
