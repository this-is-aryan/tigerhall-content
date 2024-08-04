import { StyleSheet, ViewStyle } from 'react-native'
import { palette } from '../../theme'

export const styles = StyleSheet.create({
  LoaderContainer: {
    margin: 16,
    backgroundColor: palette.greyB3,
    borderRadius: 16,
    overflow: 'hidden'
  } as ViewStyle,

  ImagePlaceholder: {
    height: 150
  } as ViewStyle,

  ContentContainer: {
    backgroundColor: palette.white,
    paddingHorizontal: 10,
    paddingBottom: 10
  } as ViewStyle,

  CategoryPlaceholder: {
    marginTop: 10,
    width: '50%',
    backgroundColor: palette.greyB3,
    height: 15,
    borderRadius: 16
  } as ViewStyle,

  TitlePlaceholder: {
    width: '80%'
  } as ViewStyle,
  ParticipantPlaceholder: {
    width: '40%'
  } as ViewStyle,
  CompanyPlaceholder: {
    width: '30%'
  } as ViewStyle,

  IconsPlaceholderContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  } as ViewStyle,

  Icon: {
    height: 22,
    width: 22,
    borderRadius: 8,
    backgroundColor: palette.greyB3,
    marginHorizontal: 5
  }
})
