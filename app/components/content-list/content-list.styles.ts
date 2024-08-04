import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { palette } from '../../theme'

export const styles = StyleSheet.create({
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
  } as ViewStyle,

  EmptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150
  } as ViewStyle,

  EmptyListText: {
    fontSize: 18,
    color: palette.white,
    textAlign: 'center',
    marginTop: 16
  } as TextStyle,
  ListFooter: {
    alignSelf: 'center',
    marginTop: 20
  } as ViewStyle,

  FooterText: {
    color: 'white',
    marginTop: 10
  } as TextStyle
})
