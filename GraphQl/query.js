import {gql} from '@apollo/client'

export const ALL =  gql`
    query{
        all{
            userSet
            data
        
        }
    }
`

export const ALLPOST = gql`
  query{ 
    allPost{
      _id
      date
      text
      imageAlbum
      commnets {
      _id
      text
      date
      byUser{
        _id
        firstname
        lastname
      }
      }
      likes{
        user
      }
    }
  }
`

export const USERINFO = gql`
query{ 
    userInfo{_id firstname lastname school major role skills interest
    }
    userPosts{
        _id
        date
        text
        imageAlbum
        commnets {
        _id
        text
        date
        byUser{
          _id
          firstname
          lastname
        }
        }
        likes{
          user
        }
      }
}
`
export const USERPOST =  gql`
query{ 
    userPosts{
        _id
        date
        text
        imageAlbum
        commnets {
        _id
          text
        byUser{
          _id
          firstname
          lastname
        }
        }
        likes{
          user
        }
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



