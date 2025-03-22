const DAD_JOKES_API = 'https://icanhazdadjoke.com/'

type Joke = {
  /**
   * The id
   * @example '4EBsPZvP7h'
   */
  id: string
  /**
   * The text of the joke
   * @example 'Something hilarious
   */
  joke: string
  /**
   * The HTTP status
   * @example 200
   */
  status: number
}

/**
 * Fetches a random dad joke (ye worse ye better)
 * @returns a {@link Joke object}
 */
export async function fetchJoke(): Promise<string> {
  try {
    const res = await fetch(DAD_JOKES_API, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch joke. Status: ${res.status}`)
    }

    const data: Joke = await res.json()
    return data.joke
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred.'
    console.error('Error fetching joke: ', errorMessage)
    return 'Ooops! Failed to fetch a joke'
  }
}