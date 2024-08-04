import React, { useState, useMemo, useCallback, memo, useEffect } from 'react'
import { styles } from './home-screen.styles'
import { View, SafeAreaView, Image, Text } from 'react-native'
import { debounce, images } from '../../utils'
import { ContentList, ContentLoader, SearchInput } from '../../components'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from '../../services/graphql/queries'
import { ContentCardsData, ContentCardsVars } from '../../components/content-card/content-card.types'
import { TIGERHALL_CONTENT_TYPES } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'

const ErrorView = () => (
  <View style={styles.ErrorContainer}>
    <Ionicons color={palette.red05} size={100} name={'alert-circle-outline'} />
    <Text style={styles.ErrorText}>{`Oops! An error has occurred. Please try again later.`}</Text>
  </View>
)

const HomeScreenComponent = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isListRefreshing, setIsListRefreshing] = useState<boolean>(false)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('')
  const { loading, error, data, refetch, fetchMore } = useQuery<ContentCardsData, ContentCardsVars>(GET_CONTENTS, {
    variables: {
      filter: {
        keywords: debouncedSearchValue,
        limit: 5,
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
    } finally {
      setIsListRefreshing(false)
    }
  }, [refetch])

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return
    try {
      setIsLoadingMore(true)
      await fetchMore({
        variables: {
          filter: {
            keywords: searchValue,
            limit: 5,
            offset: offset + 5,
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
      setOffset(offset + 5)
    } catch (error) {
      console.error('Error loading more data:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [hasMore, isLoadingMore, fetchMore, searchValue, offset])

  const ScreenContent = useMemo(() => {
    if (error) {
      return <ErrorView />
    }
    if (loading || isListRefreshing) return <ContentLoader />
    if (data)
      return (
        <ContentList
          isRefreshing={isListRefreshing}
          onRefresh={handleRefresh}
          listData={data}
          onEndReached={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      )
  }, [error, loading, isListRefreshing, data, handleRefresh, handleLoadMore, isLoadingMore])

  return (
    <>
      <SafeAreaView style={styles.SceneContainer}>
        <View style={styles.HeaderContainer}>
          <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
          <SearchInput searchInput={searchValue} onChangeSearchInput={setSearchValue} />
        </View>
        {ScreenContent}
      </SafeAreaView>
    </>
  )
}

export const HomeScreen = memo(HomeScreenComponent)
