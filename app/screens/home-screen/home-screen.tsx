import React from 'react'
import { styles } from './home-screen.styles'
import { Text, View, SafeAreaView, Image } from 'react-native'
import { images } from '../../utils'
import { SearchInput } from '../../components'

const HomeScreenHeader = () => (
  <View style={styles.HeaderContainer}>
    <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
    <SearchInput />
  </View>
)

export const HomeScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.StatusBar}>
        <HomeScreenHeader />
      </SafeAreaView>
    </>
  )
}
