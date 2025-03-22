'use client'

import { FC, useState } from 'react'
import { fetchJoke } from 'app/api'

export const Jokes: FC = () => {
  const [joke, setJoke] = useState<string>('wait for it...')

  async function fetchNewJoke() {
    const newJoke = await fetchJoke()
    setJoke(newJoke)
  }

  return <JokesDisplay joke={joke} fetchNewJoke={fetchNewJoke} />
}

interface Props {
  /**
   * The hilarious joke text to be displayed in the UI
   */
  joke: string
  /**
   * Function to fetch a new joke
   */
  fetchNewJoke: () => void
}

const JokesDisplay: FC<Props> = props => (
  <section>
    <button onClick={props.fetchNewJoke}>Click for Hilarity</button>
    <p id='joke'>{props.joke}</p>
  </section>
)

export default Jokes