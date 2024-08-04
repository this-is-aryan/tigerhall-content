import { StyleSheet, ViewStyle, ImageStyle, StatusBar, TextStyle } from 'react-native'
import { palette } from '../../theme'
import { isAndroid } from '../../utils'

export const styles = StyleSheet.create({
  SceneContainer: {
    flex: 1,
    backgroundColor: palette.black
  } as ViewStyle,

  HeaderContainer: {
    paddingVertical: 16,
    backgroundColor: palette.black,
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: isAndroid ? StatusBar.currentHeight : 0,
    borderBottomWidth: 0.4,
    borderColor: palette.grey33
  } as ViewStyle,

  Logo: {
    height: 40,
    width: 40
  } as ImageStyle,

  ErrorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    flex: 1
  } as ViewStyle,

  ErrorText: {
    fontSize: 18,
    color: palette.white,
    textAlign: 'center',
    marginTop: 16
  } as TextStyle
})
