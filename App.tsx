import { HomeScreen } from './app/screens'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './app/services'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <HomeScreen />
    </ApolloProvider>
  )
}
