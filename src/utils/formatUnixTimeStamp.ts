export const formatUnixTimestamp = (timestamp: number) => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(timestamp * 1000)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
3

  // // Get day, month, and year
  const day = String(date.getDate()).padStart(2, '0') 
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  // return date.toISOString()

  // Return formatted date as DD-MM-YYYY
  return `${month} ${day}, ${year}`
}
