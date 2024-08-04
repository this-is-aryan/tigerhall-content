import { StyleSheet, ViewStyle, ImageStyle, StatusBar } from 'react-native'
import { palette } from '../../theme'
import { isAndroid } from '../../utils'

export const styles = StyleSheet.create({
  StatusBar: {
    backgroundColor: palette.black
  } as ViewStyle,

  HeaderContainer: {
    paddingVertical: 10,
    backgroundColor: palette.black,
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: isAndroid ? StatusBar.currentHeight : 0
  } as ViewStyle,

  Logo: {
    height: 40,
    width: 40
  } as ImageStyle
})
