export const chunkArray = (array: any[], size: number): any[][] => {
  const chunks = array.reduce((result, item, index) => { 
    const chunkIndex = Math.floor(index / size)

    if (!result[chunkIndex]) {
      result[chunkIndex] = []
    }

    result[chunkIndex].push(item)

    return result
  }, [])

  return chunks
}