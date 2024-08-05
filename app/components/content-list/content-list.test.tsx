import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { ContentList } from './content-list'
import { ContentCardsData } from '../content-card/content-card.types'

// Mock data for the list
const mockData: ContentCardsData = {
  contentCards: {
    edges: [
      {
        id: '1',
        name: 'Test Podcast 1',
        length: 1200,
        timeSpentOnByUsers: 300,
        image: {
          uri: 'https://example.com/image1.jpg'
        },
        categories: [
          {
            name: 'Category 1'
          }
        ],
        participants: [
          {
            firstName: 'John',
            lastName: 'Doe',
            company: 'Example Inc.'
          }
        ]
      },
      {
        id: '2',
        name: 'Test Podcast 2',
        length: 1500,
        timeSpentOnByUsers: 600,
        image: {
          uri: 'https://example.com/image2.jpg'
        },
        categories: [
          {
            name: 'Category 2'
          }
        ],
        participants: [
          {
            firstName: 'Jane',
            lastName: 'Smith',
            company: 'Another Inc.'
          }
        ]
      }
    ]
  }
}

describe('ContentList', () => {
  it('renders with data', () => {
    const { getByText, getAllByTestId } = render(
      <ContentList listData={mockData} isRefreshing={false} onRefresh={() => {}} onEndReached={() => {}} isLoadingMore={false} />
    )

    // Check if the list header and items are rendered
    expect(getByText('Tigerhall Library')).toBeTruthy()
    expect(getByText('Test Podcast 1')).toBeTruthy()
    expect(getByText('Test Podcast 2')).toBeTruthy()

    // Check if content card items are rendered
    const contentCards = getAllByTestId('content-card')
    expect(contentCards.length).toBe(2)
  })

  it('shows empty message when no data is available', () => {
    const { getByText, getByTestId } = render(
      <ContentList
        listData={{ contentCards: { edges: [] } }}
        isRefreshing={false}
        onRefresh={() => {}}
        onEndReached={() => {}}
        isLoadingMore={false}
      />
    )

    // Check for empty list message
    expect(getByText('No Items Available.')).toBeTruthy()

    // Check if empty list icon is rendered
    expect(getByTestId('empty-icon')).toBeTruthy()
  })

  it('shows loading indicator when more items are being loaded', () => {
    const { getByText, getByTestId } = render(
      <ContentList listData={mockData} isRefreshing={false} onRefresh={() => {}} onEndReached={() => {}} isLoadingMore={true} />
    )

    // Check for loading footer
    expect(getByText('Loading more items...')).toBeTruthy()

    // Check if loading indicator is rendered
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('triggers onEndReached when scrolled to the end', async () => {
    const mockOnEndReached = jest.fn()

    const { getByTestId } = render(
      <ContentList listData={mockData} isRefreshing={false} onRefresh={() => {}} onEndReached={mockOnEndReached} isLoadingMore={false} />
    )

    // Simulate reaching the end of the list
    fireEvent.scroll(getByTestId('content-list'), {
      nativeEvent: {
        contentOffset: { y: 1000 },
        contentSize: { height: 2000 },
        layoutMeasurement: { height: 1000 }
      }
    })

    await waitFor(() => {
      expect(mockOnEndReached).toHaveBeenCalled()
    })
  })
})
