import {gql} from '@apollo/client'

export const ALLPOST = gql`
 query{ 
    allPost{
      _id
      date
      text
      imageAlbum
      owner{
        _id
        firstname
        lastname
        email
        school
        avatar
      }
      commnets
      likes{
        _id
        firstname
        lastname
        school
        avatar
    }
    userLiked
  }
}
`

export const GETUSER = gql`
query getUser($user: String!){
  getUser(user: $user){
    info{
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
      posts{
    _id
    date
    text
    imageAlbum
    commnets
    likes{
        _id
        firstname
        lastname
        school
        avatar
    }
    
    }
    }
  }
`

export const USERINFO = gql`
query { 
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
    commnets
    likes{
        _id
        firstname
        lastname
        school
        avatar
    }
    userLiked
  }
}
`


export const SEARCHUSER = gql`
query searchUser($name: String){
  searchUser(name: $name){
    _id
    firstname
    lastname
    avatar
    school
  }
}
`

export const LOOKUP = gql`
query lookUp($name: String){
  lookUp(name: $name){
    _id
    firstname
    lastname
    avatar
    school
  }
}`

export const GETCOMMENTS  = gql`
query getComments($post: ID!){
  getComments(post: $post){
    _id
    post
    text
    byUser{
      _id
      avatar
      firstname
      lastname
      school
    }
    date
  }
}
`




export const GETMESSAGES = gql`
query getComments($room: String!){
  getMessage(room: $room){
    _id
    text
    user{
      _id
      name
      avatar
    }
    createdAt
  }
}
`