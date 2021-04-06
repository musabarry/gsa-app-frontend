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
      owner{
        _id
        firstname
        lastname
        avatar
        school
        
      }
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
        avatar
        school
      }
      }
      likes{
        _id
      }
    }
  }
`

export const USERINFO = gql`
query{ 
  userInfo{
    _id
    avatar
    firstname 
    lastname 
    school 
    email
    major
    role
    interest
    skills
  }
  userPosts{
    _id
    date
    text
    imageAlbum
    commnets{
      _id
      text
      byUser{
        _id
        firstname
        lastname
        avatar
        school
      }
    }
    likes{
      _id
      firstname
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


export const CONNECTION =  gql`
query{
    connection{
    data
    }
  }
`



