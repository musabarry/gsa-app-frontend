import {gql} from '@apollo/client'

export const LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(input:{email: $email, password: $password}){
      _id
      token
      email
      success
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
    _id
    email
    token
    success
  }
}
`

export const  CREATEUSER = gql`
 mutation createUser($account: ID!, $firstname: String!, $lastname: String!, $school: String!, $major: String, $role: String, $skills: [String], $interest: [String]) {
  createUser(userInput: {account: $account, firstname: $firstname, lastname:$lastname, school:$school, major: $major, role: $role, skills: $skills, interest: $interest}) {
    role,
    _id
  }
}
`

export const CREATEPOSTTEXT = gql`
mutation createPostText($owner: ID!, $text: String!){
  createPostText(postTextInput:{owner: $owner, text: $text}){
    _id
  }
}
`

export const  CREATEPOSTIMAGE = gql`
  mutation createPostImage($owner: ID!, $imageAlbum:[String!]!, $text: String){
      createPostImage(postImage:{owner: $owner, imageAlbum: $imageAlbum, text: $text}){
        _id
      }
    }
`

//createUser(userInput: {account: $account, firstname: $firstname, lastname:$lastname, school: $school, major:$major, role: $role, interest: $interest})

// export const  CREATEUSER = gql`
// mutation createUser($account: String, $firstname: String, $lastname: String, $school: String, $major: String, $role: String, $interest: String){
//   createUser(userInput: {account: "5fb2bc64a6b575035855926b", firstname: "Cellou", lastname:"Diallo", school:"CITY TECH", major:"CST", role:"TEAM member", interest:["CODING"]}) {
//     role
//   }
// }
// `









