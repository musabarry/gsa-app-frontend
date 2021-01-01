import {gql} from '@apollo/client'

export const ALL =  gql`
    query{
        all{
            _id
            email
        }
    }
`