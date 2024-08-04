import React, { useRef } from 'react'
import { styles } from './content-list.styles'
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'
import { ContentCardsData, Podcast } from '../content-card/content-card.types'
import { ContentCard } from '../content-card'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'

interface ContentListProps {
  listData: ContentCardsData
  isRefreshing: boolean
  onRefresh: () => void
  onEndReached?: () => void
  isLoadingMore?: boolean
}

export const ContentList = (props: ContentListProps) => {
  const { listData, isRefreshing, onRefresh, isLoadingMore, onEndReached } = props
  const { edges } = listData?.contentCards || []

  const renderItem = ({ item, index }: { item: Podcast; index: number }) => <ContentCard key={index} {...item} />

  const keyExtractor = (_: any, index: number) => `content-item-${index}`

  const ListHeaderComponent = useRef(() => <Text style={styles.ListHeader}>{`Tigerhall Library`}</Text>).current

  const ListEmptyComponent = useRef(() => (
    <View style={styles.EmptyListContainer}>
      <Ionicons name={'reader-outline'} color={palette.orange36} size={100} />
      <Text style={styles.EmptyListText}>{`No Items Available.`}</Text>
    </View>
  )).current

  const ListFooterComponent = () => {
    if (!isLoadingMore) return null
    return (
      <View style={styles.ListFooter}>
        <ActivityIndicator size="large" color={palette.white} />
        <Text style={styles.FooterText}>Loading more items...</Text>
      </View>
    )
  }

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={edges}
      renderItem={renderItem}
      contentContainerStyle={styles.ContentList}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={5}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      refreshControl={<RefreshControl colors={[palette.white]} tintColor={palette.white} refreshing={isRefreshing} onRefresh={onRefresh} />}
    />
  )
}
