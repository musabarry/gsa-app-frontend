import {gql} from '@apollo/client'

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
        firstname
        lastname
        school
        avatar
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
        firstname
        lastname
        school
        avatar
      }
  }
}
`


export const connection = gql`
query{
  connection{
    success
  }
}
`