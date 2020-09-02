export const shortenHash = (text = '') => {
  if (!text) return text

  const split = text.split('_')
  const zoobcPrefix = split[0]
  const head = split[1]
  const tail = split[split.length - 1]

  const truncateHead = head.slice(0, head.length - 4)
  const truncateTail = tail.slice(tail.length - 4, tail.length)

  return `${zoobcPrefix}_${truncateHead}...${truncateTail}`
}
