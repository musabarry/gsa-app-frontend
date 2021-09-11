import {gql} from '@apollo/client'

export const LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(input:{email:$email, password:$password }){
      token
      success
      _id
      email
    }
  }
`

export const PROFILEIMAGE = gql`
  mutation profileImage($image: String!){
    profileImage(input:{image: $image}){
      success
    }
  }
`

export const CREATECOMMENT = gql`
mutation createCommnet($post: ID!, $text: String!){
  createCommnet(input:{post: $post, text: $text}){
    _id
  }
}
`

export const  SIGNUP = gql`
mutation signup($email: String!, $password: String!, $firstname: String!, $lastname: String!, $school: String!){
  signup(input:{email: $email, password: $password, firstname: $firstname, lastname: $lastname, school: $school}){
    token
    success
    _id
    email
  }
}
`

export const CREATEPOSTTEXT = gql`
mutation createPostText($owner: ID!, $text: String!){
  createPostText(input:{owner: $owner, text: $text}){
    success
  }
}
`

export const  CREATEPOSTIMAGE = gql`
  mutation createPostImage($owner: ID!, $imageAlbum:[String], $text: String){
      createPostImage(input:{owner: $owner, imageAlbum: $imageAlbum, text: $text}){
        success
      }
    }
`

export const CREATELIKE = gql`
mutation like($post: ID!){
  like(input:{post: $post}){
    success
    _id
  }
}
`


export const DELETEPOST  = gql`
mutation deletePost($post: ID!){
  deletePost(input:{post: $post}){
    success
  }
}
`

export const UPDATEPASSWORD =  gql`
mutation updatePassword($email: String!, $currentPassword: String!, $newPassword: String!){
  updatePassword(input:{email: $email, currentPassword: $currentPassword, newPassword: $newPassword}){
    email
    token
    success
    _id
  }
}
`

export const UPDATEINFO = gql`
mutation  updateUserInfo($major: String!, $role: String, $interest: [String], $skills: [String]){
  updateUserInfo(input:{major: $major, role: $role, interest: $interest, skills: $skills}){
    success
  }
}
`
