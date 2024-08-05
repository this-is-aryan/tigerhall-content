import React, { useRef } from 'react'
import { View, TextInput } from 'react-native'
import { styles } from './search-input.styles'
import { palette } from '../../theme'
import { MAX_CHARACTERS_ALLOWED } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons'

interface SearchInputProps {
  searchInput: string
  onChangeSearchInput: (text: string) => void
}

export const SearchInput = (props: SearchInputProps) => {
  const { searchInput, onChangeSearchInput } = props

  const onPressCrossIcon = useRef(() => {
    onChangeSearchInput('')
  }).current

  return (
    <View style={styles.SearchInputContainer} testID="search-input-container">
      <Ionicons name="search" size={25} color="white" testID="search-icon" />
      <TextInput
        style={styles.SearchInput}
        cursorColor={palette.white}
        placeholder={'Search...'}
        value={searchInput}
        onChangeText={onChangeSearchInput}
        multiline={false}
        maxLength={MAX_CHARACTERS_ALLOWED}
        underlineColorAndroid="transparent"
        placeholderTextColor={palette.grey7D}
        autoCorrect={false}
        autoComplete={'off'}
        testID="search-text-input"
      />
      {searchInput?.length ? (
        <Ionicons onPress={onPressCrossIcon} name="close-circle-outline" size={20} color="white" testID="clear-icon" />
      ) : null}
    </View>
  )
}
