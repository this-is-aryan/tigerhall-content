import React from 'react'
import { styles } from './search-input.styles'
import { View, Text, TextInput } from 'react-native'
import { palette } from '../../theme'

export const SearchInput = () => {
  return (
    <View style={styles.SearchInputContainer}>
      <TextInput style={styles.SearchInput} placeholder={'Type to Search'} placeholderTextColor={palette.black} />
    </View>
  )
}
