import {gql} from '@apollo/client'

export const ALL =  gql`
    query{
        all{
            userSet
            data
        
        }
    }
`

export const USERINFO = gql`
query{ 
    userInfo{_id firstname lastname school major role skills interest
    }
}
`



export const CONNECTION =  gql`
query{
    connection{
    data
    }
  }
`



