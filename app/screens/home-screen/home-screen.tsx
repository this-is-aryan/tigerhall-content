import React, { useMemo, useCallback, memo, useEffect, useState } from 'react'
import { styles } from './home-screen.styles'
import { View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import { debounce, images } from '../../utils'
import { ContentList, ContentLoader, SearchInput } from '../../components'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from '../../services/graphql/queries'
import { ContentCardsData, ContentCardsVars } from '../../components/content-card/content-card.types'
import { LIMIT, TIGERHALL_CONTENT_TYPES } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'

// ErrorView Component
const ErrorView = ({ retry }: { retry: () => void }) => (
  <View style={styles.ErrorContainer}>
    <Ionicons color={palette.red05} size={100} name={'alert-circle-outline'} />
    <Text style={styles.ErrorText}>{`Oops! An error has occurred. Please try again later.`}</Text>
    <TouchableOpacity style={styles.RetryButton} onPress={retry}>
      <Text style={styles.RetryText}>Retry</Text>
    </TouchableOpacity>
  </View>
)

const HomeScreenComponent = () => {
  // Initial States
  const [searchValue, setSearchValue] = useState('')
  const [isListRefreshing, setIsListRefreshing] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

  const { loading, error, data, refetch, fetchMore } = useQuery<ContentCardsData, ContentCardsVars>(GET_CONTENTS, {
    variables: {
      filter: {
        keywords: debouncedSearchValue,
        limit: LIMIT,
        offset: 0,
        types: [TIGERHALL_CONTENT_TYPES.PODCAST]
      }
    }
  })

  // Debounced version of search query
  const debounceSearch = debounce((value: string) => {
    setDebouncedSearchValue(value)
  }, 300)

  // Update debounced value when searchValue changes
  useEffect(() => {
    debounceSearch(searchValue)
  }, [searchValue, debounceSearch])

  const handleRefresh = useCallback(async () => {
    setIsListRefreshing(true)
    try {
      await refetch()
      setOffset(0)
      setHasMore(true)
    } finally {
      setIsListRefreshing(false)
    }
  }, [refetch])

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return
    try {
      await fetchMore({
        variables: {
          filter: {
            keywords: searchValue,
            limit: 5,
            offset: offset + LIMIT,
            types: [TIGERHALL_CONTENT_TYPES.PODCAST]
          }
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.contentCards.edges.length) {
            setHasMore(false)
            return prevResult
          }
          return {
            ...prevResult,
            contentCards: {
              edges: [...prevResult.contentCards.edges, ...fetchMoreResult.contentCards.edges]
            }
          }
        }
      })
      setOffset(offset + LIMIT)
    } catch (error) {
      console.error('Error loading more data:', error)
    }
  }, [hasMore, fetchMore, searchValue, offset])

  const retryFetch = useCallback(async () => {
    await refetch()
  }, [refetch])

  const ScreenContent = useMemo(() => {
    if (error) {
      return <ErrorView retry={retryFetch} />
    }
    if (loading || isListRefreshing) return <ContentLoader />
    if (data) {
      return (
        <ContentList
          isRefreshing={isListRefreshing}
          onRefresh={handleRefresh}
          listData={data}
          onEndReached={handleLoadMore}
          isLoadingMore={hasMore}
        />
      )
    }
    return null
  }, [error, loading, isListRefreshing, data, handleRefresh, handleLoadMore, retryFetch])

  return (
    <SafeAreaView style={styles.SceneContainer}>
      <View style={styles.HeaderContainer}>
        <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
        <SearchInput searchInput={searchValue} onChangeSearchInput={(value) => setSearchValue(value)} />
      </View>
      {ScreenContent}
    </SafeAreaView>
  )
}

export const HomeScreen = memo(HomeScreenComponent)
