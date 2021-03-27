import {gql} from '@apollo/client'

export const LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(input:{email: $email, password: $password}){
      token
      success
      info
      account{
        _id
      }
    }
  }
`
export const  SIGNUP = gql`
mutation signup($email: String!, $password: String!){
  signup(input:{email: $email, password: $password}){
      token
      info
      success
      account{
        _id
      }
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









