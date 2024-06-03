import { NewUser } from "../utils/interfaces";

export const postNewUser = (newUser: NewUser) => {
  return fetch(
    "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
    {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      referrer: "https://rr-as.vercel.app/",
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'https://rr-as.vercel.app/',
        'Access-Control-Expose-Headers': 'Authorization',
        'Access-Control-Allow-Headers': 'Authorization',
        'Vary': 'Origin'
      },
      body: JSON.stringify(newUser),
    }
  ).then((response) => {
    return response.json();
  });
};

export const fetchUser = (email: string, password: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
  return fetch(
    "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "user": {
            "email": email,
            "password": password,
        },
      }),
    }
  ).then((response) => {
    if(response.status === 401) {
      setError('Invalid credentials')
    } else {
      sessionStorage.setItem('token', response.headers.get('Authorization') ?? '')
      return response.json();
    }
  });
};

export const destroyToken = () => {
  return fetch(
    "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/logout",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem('token') ?? ''
      },
    }
  ).then((response) => {
    sessionStorage.removeItem('token')
    return response.json();
  });
}