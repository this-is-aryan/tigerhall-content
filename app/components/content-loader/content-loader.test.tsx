import React from 'react'
import { render } from '@testing-library/react-native'
import { ContentLoader } from './content-loader'

// Test suite for ContentLoader
describe('ContentLoader', () => {
  it('renders the default number of placeholders', () => {
    const { getAllByTestId } = render(<ContentLoader />)

    // Check that the loader renders the default number of placeholders (5)
    const placeholders = getAllByTestId('content-card-placeholder')
    expect(placeholders.length).toBe(5)
  })

  it('renders a specified number of placeholders', () => {
    const { getAllByTestId } = render(<ContentLoader itemCount={3} />)

    // Check that the loader renders the specified number of placeholders (3)
    const placeholders = getAllByTestId('content-card-placeholder')
    expect(placeholders.length).toBe(3)
  })

  it('renders the correct structure for placeholders', () => {
    const { getAllByTestId } = render(<ContentLoader />)

    // Check if the loader has the correct structure
    const placeholders = getAllByTestId('content-card-placeholder')
    expect(placeholders.length).toBe(5) // Assuming default itemCount is 5

    placeholders.forEach((placeholder) => {
      expect(placeholder).toBeTruthy()

      // Check for child components in the placeholder
      const imagePlaceholder = placeholder.findByTestId('image-placeholder')
      const contentContainer = placeholder.findByTestId('content-container')
      const categoryPlaceholder = contentContainer.findByTestId('category-placeholder')
      const titlePlaceholder = contentContainer.findByTestId('title-placeholder')
      const participantPlaceholder = contentContainer.findByTestId('participant-placeholder')
      const companyPlaceholder = contentContainer.findByTestId('company-placeholder')
      const iconsPlaceholderContainer = contentContainer.findByTestId('icons-placeholder-container')
      const icons = iconsPlaceholderContainer.findAllByTestId('icon')

      expect(imagePlaceholder).toBeTruthy()
      expect(categoryPlaceholder).toBeTruthy()
      expect(titlePlaceholder).toBeTruthy()
      expect(participantPlaceholder).toBeTruthy()
      expect(companyPlaceholder).toBeTruthy()
      expect(icons.length).toBe(2) // Two icons should be present
    })
  })
})
