import { StyleSheet, ViewStyle } from 'react-native'
import { palette } from '../../theme'
export const styles = StyleSheet.create({
  SearchInputContainer: {
    backgroundColor: palette.grey33,
    borderRadius: 5,
    overflow: 'hidden',
    height: 40,
    marginLeft: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  } as ViewStyle,

  SearchInput: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: palette.white
  }
})
