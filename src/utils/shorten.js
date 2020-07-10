export const shortenHash = (hash, limit = 20) => {
  if (limit < 15) return hash

  if (hash && hash.length > limit) {
    const head = hash.slice(0, limit - 10)
    const tail = hash.slice(hash.length - 4, hash.length)
    return `${head}...${tail}`
  } else return hash
}
