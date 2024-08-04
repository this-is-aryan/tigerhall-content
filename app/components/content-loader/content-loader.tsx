import React from 'react'
import { FlatList, View } from 'react-native'
import { styles } from './content-loader.styles'

interface ContentLoaderProps {
  itemCount?: number
}

const ContentCardPlaceholder = () => (
  <View style={styles.LoaderContainer}>
    <View style={styles.ImagePlaceholder} />
    <View style={styles.ContentContainer}>
      <View style={styles.CategoryPlaceholder} />
      <View style={[styles.CategoryPlaceholder, styles.TitlePlaceholder]} />
      <View style={[styles.CategoryPlaceholder, styles.ParticipantPlaceholder]} />
      <View style={[styles.CategoryPlaceholder, styles.CompanyPlaceholder]} />
      <View style={styles.IconsPlaceholderContainer}>
        <View style={styles.Icon} />
        <View style={styles.Icon} />
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
