import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { SearchInput } from './search-input'

describe('SearchInput Component', () => {
  const mockOnChangeSearchInput = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the search input component', () => {
    const { getByTestId } = render(<SearchInput searchInput="" onChangeSearchInput={mockOnChangeSearchInput} />)

    // Verify that the search input is rendered
    expect(getByTestId('search-input-container')).toBeTruthy()
  })

  it('should call onChangeSearchInput when text changes', () => {
    const { getByTestId } = render(<SearchInput searchInput="" onChangeSearchInput={mockOnChangeSearchInput} />)

    // Simulate text change
    fireEvent.changeText(getByTestId('search-text-input'), 'test')

    // Verify that the mock function was called with the new text
    expect(mockOnChangeSearchInput).toHaveBeenCalledWith('test')
  })

  it('should display the clear icon when there is text in the input', () => {
    const { getByTestId } = render(<SearchInput searchInput="test" onChangeSearchInput={mockOnChangeSearchInput} />)

    // Verify that the clear icon is displayed
    expect(getByTestId('clear-icon')).toBeTruthy()
  })

  it('should clear the input when the clear icon is pressed', () => {
    const { getByTestId } = render(<SearchInput searchInput="test" onChangeSearchInput={mockOnChangeSearchInput} />)

    // Simulate press on the clear icon
    fireEvent.press(getByTestId('clear-icon'))

    // Verify that the mock function was called to clear the input
    expect(mockOnChangeSearchInput).toHaveBeenCalledWith('')
  })
})
