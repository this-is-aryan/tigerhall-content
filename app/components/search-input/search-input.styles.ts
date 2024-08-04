import { StyleSheet, ViewStyle } from 'react-native'
import { palette } from '../../theme'
export const styles = StyleSheet.create({
  SearchInputContainer: {
    backgroundColor: palette.white,
    borderRadius: 16,
    overflow: 'hidden',
    height: 40,
    marginLeft: 40
  } as ViewStyle,

  SearchInput: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})
