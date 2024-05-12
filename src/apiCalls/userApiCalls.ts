import { NewUser } from "../utils/interfaces";

export const postNewUser = (newUser: NewUser) => {
  return fetch(
    "https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/users/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newUser,
      }),
    }
  ).then((response: any) => {
   return response.json();
  });
};


//Will refactor to use email and password to fetch user in body

// export const fetchUser = (email: string, password: string) => {
//     return fetch(`https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/users?email=${email}&password=${password}`)
// }


export const fetchUser = (email: string, password: string) => {
  return fetch(
    "https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "data": {
          "type": "user",
          "attributes": {
            "email": email,
            "password": password,
          },
        },
      }),
    }
  ).then((response) => {
    return response.json();
  });
};
