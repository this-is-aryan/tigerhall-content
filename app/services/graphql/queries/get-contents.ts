import { gql } from '@apollo/client'

export const GET_CONTENTS = gql`
  query ContentCards($filter: ContentCardsFilter) {
    contentCards(filter: $filter) {
      edges {
        ... on Podcast {
          name
          length
          timeSpentOnByUsers
          image {
            uri
          }
          categories {
            name
          }
          participants {
            firstName
            lastName
            company
          }
        }
      }
    }
  }
`
