import React from 'react'
import { View, ViewStyle } from 'react-native'
import { styles } from './progress-bar.styles'

interface ProgressBarProps {
  progressPercentage: number
  progressContainerStyle?: ViewStyle
  progressBarFillStyle?: ViewStyle
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { progressBarFillStyle, progressContainerStyle, progressPercentage = 0 } = props
  return (
    <View style={[progressContainerStyle, styles.ProgressContainer]}>
      <View style={styles.ProgressBarContainer}>
        <View style={styles.ProgressBar}>
          <View style={[progressBarFillStyle, styles.ProgressBarFill, { width: `${progressPercentage}%` }]}></View>
        </View>
      </View>
    </View>
  )
}
