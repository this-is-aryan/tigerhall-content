import React, { useRef, useMemo, memo } from 'react'
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
  onEndReached: () => void
  isLoadingMore?: boolean
}

const TigerhallContentList = (props: ContentListProps) => {
  const { listData, isRefreshing, onRefresh, onEndReached, isLoadingMore } = props
  const { edges } = listData?.contentCards || []
  const renderItem = ({ item }: { item: Podcast }) => <ContentCard key={item.id} {...item} />

  const keyExtractor = (item: Podcast) => `content-item-${item.id}`

  const ListHeaderComponent = useRef(() => <Text style={styles.ListHeader}>{`Tigerhall Library`}</Text>).current

  const ListEmptyComponent = useRef(() => (
    <View style={styles.EmptyListContainer}>
      <Ionicons name={'reader-outline'} color={palette.orange36} size={100} />
      <Text style={styles.EmptyListText}>{`No Items Available.`}</Text>
    </View>
  )).current

  const ListFooterComponent = useMemo(() => {
    if (!isLoadingMore) return
    return (
      <View style={styles.ListFooter}>
        <ActivityIndicator size="large" color={palette.white} />
        <Text style={styles.FooterText}>Loading more items...</Text>
      </View>
    )
  }, [isLoadingMore])

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={edges}
      renderItem={renderItem}
      contentContainerStyle={styles.ContentList}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={onEndReached}
      maxToRenderPerBatch={5}
      onEndReachedThreshold={0.1}
      refreshControl={<RefreshControl colors={[palette.white]} tintColor={palette.white} refreshing={isRefreshing} onRefresh={onRefresh} />}
    />
  )
}

export const ContentList = memo(TigerhallContentList)
