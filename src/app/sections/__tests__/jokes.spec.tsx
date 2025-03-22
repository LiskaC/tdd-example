import React from 'react'
import '@testing-library/jest-dom'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen } from '@testing-library/react'
import Jokes from '../jokes'

describe('Jokes', () => {

  const server = setupServer(
    http.get('https://icanhazdadjoke.com/', () => {
      return HttpResponse.json({ id: 1, joke: 'Blah', status: 200 })
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  beforeEach(() => {
    render(<Jokes />)
  })

  it('displays a button to fetch a joke', () => {
    const cta = screen.getByRole('button')

    expect(cta).toBeInTheDocument()
    expect(cta).toHaveTextContent('Click for Hilarity')
  })

  it('displays a placeholder joke text on initial render', () => {
    const placeholderText = screen.getByText(/wait for it.../i)

    expect(placeholderText).toBeInTheDocument()
  })

  it('updates the joke text with a fetched joke when the button is clicked', async () => {
    fireEvent.click(screen.getByText('Click for Hilarity'))

    const joke = await screen.findByText('Blah')

    expect(joke).toBeInTheDocument()
  })

  it('displays an error message when the joke fetch fails', async () => {

    server.use(
      http.get('https://icanhazdadjoke.com/', () => {
        return HttpResponse.error()
      })
    )

    fireEvent.click(screen.getByText('Click for Hilarity'))

    const error = await screen.findByText('Ooops! Failed to fetch a joke')

    expect(error).toBeInTheDocument()
  })
})