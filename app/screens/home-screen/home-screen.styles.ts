import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { palette } from '../../theme'

export const styles = StyleSheet.create({
  StatusBar: {
    backgroundColor: palette.black
  } as ViewStyle,

  HeaderContainer: {
    height: 50,
    backgroundColor: palette.black,
    paddingHorizontal: 16,
    flexDirection: 'row'
  } as ViewStyle,
  Logo: {
    height: 40,
    width: 40
  } as ImageStyle
})
