import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { palette } from '../../theme'
import { isAndroid } from '../../utils'
import { CARD_IMAGE_HEIGHT } from '../../constants'

export const styles = StyleSheet.create({
  ContentCardContainer: {
    marginVertical: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  } as ViewStyle,

  ContentImage: {
    height: CARD_IMAGE_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'space-between'
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

  ContentSpecsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-end'
  } as ViewStyle,

  Audio: {
    height: 35,
    width: 35,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.orange29
  } as ViewStyle,

  ContentLengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: palette.black07,
    borderRadius: 20,
    height: 30
  } as ViewStyle,

  ContentLength: {
    color: palette.white,
    marginLeft: 3,
    fontWeight: '700'
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
    fontSize: 20,
    marginTop: 5
  } as TextStyle,

  Participant: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: palette.grey4D,
    marginTop: 5
  } as TextStyle,

  Company: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '700',
    color: palette.grey4D,
    marginVertical: 5
  } as TextStyle,

  ShareAndSaveContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  } as ViewStyle,

  ShareIcon: {
    marginRight: 10
  } as TextStyle
})
