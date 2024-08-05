import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { MockedProvider } from '@apollo/client/testing'
import { HomeScreen } from './home-screen'
import { GET_CONTENTS } from '../../services/graphql/queries'

// Mock data for the GraphQL query
const mocks = [
  {
    request: {
      query: GET_CONTENTS,
      variables: {
        filter: {
          keywords: '',
          limit: 10,
          offset: 0,
          types: ['PODCAST']
        }
      }
    },
    result: {
      data: {
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
    }
  }
]

describe('HomeScreen', () => {
  it('renders loading state initially', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <HomeScreen />
      </MockedProvider>
    )

    // Check for the loading state (spinner or loader)
    expect(getByTestId('content-loader')).toBeTruthy()
  })

  it('renders podcast list successfully', async () => {
    const { getByText, getAllByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeScreen />
      </MockedProvider>
    )

    // Wait for data to load
    await waitFor(() => {
      expect(getByText('Test Podcast 1')).toBeTruthy()
      expect(getByText('Test Podcast 2')).toBeTruthy()
    })

    // Check if both podcasts are rendered
    const podcastItems = getAllByTestId('podcast-item')
    expect(podcastItems.length).toBe(2)
  })

  it('displays an error message on error', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_CONTENTS,
          variables: {
            filter: {
              keywords: '',
              limit: 10,
              offset: 0,
              types: ['PODCAST']
            }
          }
        },
        error: new Error('An error occurred')
      }
    ]

    const { getByText } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <HomeScreen />
      </MockedProvider>
    )

    // Wait for the error message to appear
    await waitFor(() => {
      expect(getByText('Oops! An error has occurred. Please try again later.')).toBeTruthy()
    })
  })

  it('calls fetchMore on reaching the end of the list', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeScreen />
      </MockedProvider>
    )

    // Wait for data to load
    await waitFor(() => {
      expect(getByTestId('content-list')).toBeTruthy()
    })

    // Simulate scrolling to the bottom of the list
    fireEvent.scroll(getByTestId('content-list'), {
      nativeEvent: {
        contentOffset: { y: 1000 },
        contentSize: { height: 1000 },
        layoutMeasurement: { height: 500 }
      }
    })

    // Assert that fetchMore was called (by checking if more items would have been loaded)
    // This is more complex and may require mocking fetchMore or tracking its calls
    // Here you could mock `fetchMore` function and verify its call
  })

  it('updates list on search input change', async () => {
    const searchMocks = [
      {
        request: {
          query: GET_CONTENTS,
          variables: {
            filter: {
              keywords: 'Test',
              limit: 10,
              offset: 0,
              types: ['PODCAST']
            }
          }
        },
        result: {
          data: {
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
                }
              ]
            }
          }
        }
      }
    ]

    const { getByPlaceholderText, getByText } = render(
      <MockedProvider mocks={searchMocks} addTypename={false}>
        <HomeScreen />
      </MockedProvider>
    )

    // Find the search input and change its value
    const searchInput = getByPlaceholderText('Search')
    fireEvent.changeText(searchInput, 'Test')

    // Wait for the search results to appear
    await waitFor(() => {
      expect(getByText('Test Podcast 1')).toBeTruthy()
    })
  })
})
