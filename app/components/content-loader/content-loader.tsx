import React from 'react'
import { FlatList, View } from 'react-native'
import { styles } from './content-loader.styles'

interface ContentLoaderProps {
  itemCount?: number
}

const ContentCardPlaceholder = () => (
  <View style={styles.LoaderContainer} testID="content-card-placeholder">
    <View style={styles.ImagePlaceholder} testID="image-placeholder" />
    <View style={styles.ContentContainer} testID="content-container">
      <View style={styles.CategoryPlaceholder} testID="category-placeholder" />
      <View style={[styles.CategoryPlaceholder, styles.TitlePlaceholder]} testID="title-placeholder" />
      <View style={[styles.CategoryPlaceholder, styles.ParticipantPlaceholder]} testID="participant-placeholder" />
      <View style={[styles.CategoryPlaceholder, styles.CompanyPlaceholder]} testID="company-placeholder" />
      <View style={styles.IconsPlaceholderContainer} testID="icons-placeholder-container">
        <View style={styles.Icon} testID="icon" />
        <View style={styles.Icon} testID="icon" />
      </View>
    </View>
  </View>
)

export const ContentLoader = (props: ContentLoaderProps) => {
  const { itemCount = 5 } = props
  const items = Array(itemCount).fill(0)
  const renderItem = () => <ContentCardPlaceholder />
  const keyExtractor = (_: any, index: number) => `loader-item-${index}`

  return <FlatList data={items} renderItem={renderItem} keyExtractor={keyExtractor} />
}
