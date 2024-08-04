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

  ListHeader: {
    fontSize: 22,
    marginVertical: 20,
    color: palette.white,
    alignSelf: 'center',
    fontWeight: '900'
  } as TextStyle,

  ContentList: {
    paddingBottom: 100,
    marginHorizontal: 16
  } as ViewStyle
})
