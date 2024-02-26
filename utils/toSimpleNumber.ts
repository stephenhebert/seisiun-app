export default function(number: number): string {
  let magnitude = 0
  const suffixes = ['', 'k', 'm', 'b', 't']
  while (number >= 1000) {
    magnitude++
    number /= 1000
  }
  
  return (number % 1 === 0 ? number : number.toFixed(1)) + suffixes[magnitude]
}