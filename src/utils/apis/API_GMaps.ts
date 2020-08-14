export const getPlace = async (input: string, GOOGLE_MAP_API_KEY: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&language=en&key=${GOOGLE_MAP_API_KEY}`

  try {
    const response: any = await fetch(url)
    return response.data.predictions.length === 1
  } catch (error) {
    console.error(error)
  }
}
