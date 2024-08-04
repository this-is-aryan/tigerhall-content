import React from 'react'
import { styles } from './home-screen.styles'
import { View, SafeAreaView, Image } from 'react-native'
import { images } from '../../utils'
import { SearchInput } from '../../components'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from '../../services/graphql/queries'

const HomeScreenHeader = () => (
  <View style={styles.HeaderContainer}>
    <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
    <SearchInput />
  </View>
)

export const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_CONTENTS, {
    variables: {
      filter: {
        keywords: '',
        limit: 10,
        types: ['PODCAST']
      }
    }
  })
  if (error) console.log('Error')
  if (loading) console.log('Loading')
  if (data) console.log(data)
  return (
    <SafeAreaView style={styles.StatusBar}>
      <HomeScreenHeader />
    </SafeAreaView>
  )
}
