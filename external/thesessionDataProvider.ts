// async function search(query: string) {
//   const response = await fetch(
//     // `https://thesession.org/tunes/search?q=${query}&format=json`,
//     {
//       headers: {
//         'Accept': 'text/json',
//       }
//     }
//   )
//   if (!response.ok) return []
//   const data = await response.json()
//   console.log(data)
//   return data.tunes
//   //   ?.map(
//   //   (item: any) => ({
//   //     value: item.id,
//   //     label: `${item.name} ${item.alias ? `(${item.alias})` : ''} ${item.type}'}`
//   //   })
//   // )
// }

// export { 
//   search,
// }