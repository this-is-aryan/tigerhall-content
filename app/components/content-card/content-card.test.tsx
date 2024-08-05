import React from 'react'
import { render } from '@testing-library/react-native'
import { ContentCard } from './content-card'
import { Podcast } from './content-card.types'

// Mock data
const mockPodcast: Podcast = {
  id: '1',
  name: 'Test Podcast',
  image: {
    uri: 'https://example.com/image.jpg'
  },
  categories: [
    {
      name: 'Technology'
    }
  ],
  participants: [
    {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Tech Inc.'
    }
  ],
  timeSpentOnByUsers: 1200,
  length: 3600
}

describe('ContentCard', () => {
  it('renders with valid data', () => {
    const { getByText, getByTestId } = render(<ContentCard {...mockPodcast} />)

    // Check if the name and other elements are rendered
    expect(getByText('Test Podcast')).toBeTruthy()
    expect(getByText('Technology')).toBeTruthy()
    expect(getByText('John Doe')).toBeTruthy()
    expect(getByText('Tech Inc.')).toBeTruthy()

    // Check for icons
    expect(getByTestId('progress-icon')).toBeTruthy()
    expect(getByTestId('headset-icon')).toBeTruthy()
    expect(getByTestId('time-icon')).toBeTruthy()
    expect(getByTestId('share-icon')).toBeTruthy()
    expect(getByTestId('bookmark-icon')).toBeTruthy()

    // Check the progress bar
    expect(getByTestId('progress-bar')).toBeTruthy()
  })

  it('calculates and displays the correct progress percentage', () => {
    const { getByText } = render(<ContentCard {...mockPodcast} />)

    // Calculate the expected progress percentage
    const progressPercentage = Math.floor((mockPodcast.timeSpentOnByUsers / mockPodcast.length) * 100)
    expect(getByText(`${progressPercentage}% Completed`)).toBeTruthy()
  })

  it('displays the correct duration', () => {
    const { getByText } = render(<ContentCard {...mockPodcast} />)

    // Calculate the expected duration in minutes
    const duration = Math.floor(mockPodcast.length / 60)
    expect(getByText(`${duration}m`)).toBeTruthy()
  })

  it('renders categories, name, participants, and company', () => {
    const { getByText } = render(<ContentCard {...mockPodcast} />)

    // Ensure categories, name, participants, and company are displayed
    expect(getByText('Technology')).toBeTruthy()
    expect(getByText('Test Podcast')).toBeTruthy()
    expect(getByText('John Doe')).toBeTruthy()
    expect(getByText('Tech Inc.')).toBeTruthy()
  })

  it('renders icons correctly', () => {
    const { getByTestId } = render(<ContentCard {...mockPodcast} />)

    // Check if icons are present
    expect(getByTestId('progress-icon')).toBeTruthy()
    expect(getByTestId('headset-icon')).toBeTruthy()
    expect(getByTestId('time-icon')).toBeTruthy()
    expect(getByTestId('share-icon')).toBeTruthy()
    expect(getByTestId('bookmark-icon')).toBeTruthy()
  })
})
