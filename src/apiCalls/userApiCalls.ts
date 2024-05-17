import { NewUser } from "../utils/interfaces";

export const postNewUser = (newUser: NewUser) => {
  return fetch(
    "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
    {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      referrer: "http://localhost:3000/",
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Expose-Headers': 'Authorization',
        'Access-Control-Allow-Headers': 'Authorization',
        'Vary': 'Origin'
      },
      body: JSON.stringify(newUser),
    }
  ).then((response) => {
    console.log(response.headers.get('Authorization'))
    localStorage.setItem('token', response.headers.get('Authorization') ?? '')
    return response.json();
  });
};

export const fetchUser = (email: string, password: string, token: string) => {
  return fetch(
    "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
      body: JSON.stringify({
          "user": {
            "email": email,
            "password": password,
        },
      }),
    }
  ).then((response) => {
    return response.json();
  });
};
