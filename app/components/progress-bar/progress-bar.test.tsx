import React from 'react'
import { render } from '@testing-library/react-native'
import { ProgressBar } from './progress-bar'

describe('ProgressBar', () => {
  it('renders correctly with default styles', () => {
    const { getByTestId } = render(<ProgressBar progressPercentage={50} />)

    const progressBarFill = getByTestId('progress-bar-fill')

    // Check if the width style is applied correctly based on progressPercentage
    expect(progressBarFill.props.style).toMatchObject({ width: '50%' })
  })

  it('renders correctly with custom progressContainerStyle', () => {
    const customContainerStyle = { backgroundColor: 'red' }
    const { getByTestId } = render(<ProgressBar progressPercentage={50} progressContainerStyle={customContainerStyle} />)

    const progressContainer = getByTestId('progress-container')

    // Check if custom progressContainerStyle is applied
    expect(progressContainer.props.style).toContainEqual(customContainerStyle)
  })

  it('renders correctly with custom progressBarFillStyle', () => {
    const customFillStyle = { backgroundColor: 'blue' }
    const { getByTestId } = render(<ProgressBar progressPercentage={75} progressBarFillStyle={customFillStyle} />)

    const progressBarFill = getByTestId('progress-bar-fill')

    // Check if custom progressBarFillStyle is applied
    expect(progressBarFill.props.style).toContainEqual(customFillStyle)
    expect(progressBarFill.props.style).toMatchObject({ width: '75%' })
  })

  it('handles edge cases for progressPercentage', () => {
    const { getByTestId: getByTestIdZero } = render(<ProgressBar progressPercentage={0} />)
    const progressBarFillZero = getByTestIdZero('progress-bar-fill')
    expect(progressBarFillZero.props.style).toMatchObject({ width: '0%' })

    const { getByTestId: getByTestIdHundred } = render(<ProgressBar progressPercentage={100} />)
    const progressBarFillHundred = getByTestIdHundred('progress-bar-fill')
    expect(progressBarFillHundred.props.style).toMatchObject({ width: '100%' })
  })

  it('does not crash with invalid progressPercentage', () => {
    const { getByTestId } = render(<ProgressBar progressPercentage={-10} />)
    const progressBarFill = getByTestId('progress-bar-fill')
    expect(progressBarFill.props.style).toMatchObject({ width: '0%' })

    const { getByTestId: getByTestIdOver } = render(<ProgressBar progressPercentage={150} />)
    const progressBarFillOver = getByTestIdOver('progress-bar-fill')
    expect(progressBarFillOver.props.style).toMatchObject({ width: '100%' })
  })
})
