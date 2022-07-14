export function formatCount(count) {
  if(!count){
    return ''
  }
  return `${Math.floor(count / 10000)}万`
}
