import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";


const FindUserByEmail = gql`
  query findbyEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      uid
      displayName
      email
      NFT {
        data {
            address
            token
        }
      }
    }
  }
`;

export const getSpfUserDetails = (props) => {
  console.log("checke cprops", props)
    const [getSeller, { data, error, loading }] = useLazyQuery(FindUserByEmail);

    const callSpfQuery = (email) => {
        getSeller({
            variables: {
              email: email,
            },
          });
    }

    

    if (error) {
        throw new Error(error)
    }

    return [callSpfQuery, {data, loading, error}]

}

export const getUserMail = () => {
    const sessionData = sessionStorage.getItem("dummy_user")
    const umail = JSON.parse(sessionData).email
    return umail
}