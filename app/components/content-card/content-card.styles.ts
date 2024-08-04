import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { palette } from '../../theme'
import { isAndroid } from '../../utils'

export const styles = StyleSheet.create({
  ContentCardContainer: {
    marginVertical: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  } as ViewStyle,

  ContentImage: {
    height: 150,
    flexDirection: 'column'
  } as ImageStyle,

  ProgressContainer: {
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: '#FFF8F1',
    borderBottomRightRadius: 10,
    width: isAndroid ? '40%' : '45%',
    flexDirection: 'row',
    alignItems: 'center'
  } as ViewStyle,

  Progress: {
    fontWeight: '700',
    marginLeft: 5
  } as TextStyle,

  ContentContainer: {
    backgroundColor: palette.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  } as ViewStyle,

  CategoryText: {
    textTransform: 'uppercase',
    color: palette.grey7D,
    fontWeight: '500'
  } as TextStyle,

  ContentName: {
    textTransform: 'capitalize',
    fontWeight: '800',
    fontSize: 20
  } as TextStyle,

  Participant: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: palette.grey4D
  } as TextStyle,

  Company: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '700',
    color: palette.grey4D
  } as TextStyle
})
