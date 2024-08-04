import { StyleSheet, ViewStyle } from 'react-native'
import { palette } from '../../theme'

export const styles = StyleSheet.create({
  ProgressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  } as ViewStyle,

  ProgressBarContainer: {
    flex: 1
  } as ViewStyle,

  ProgressBar: {
    height: 2,
    backgroundColor: palette.white
  } as ViewStyle,

  ProgressBarFill: {
    height: '100%',
    backgroundColor: palette.orange00
  } as ViewStyle
})
