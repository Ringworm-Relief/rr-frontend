import { NewUser } from "../utils/interfaces";

export const postNewUser = (newUser: NewUser): Promise<any> => {
  return fetch(
    "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }
  ).then((response) => {
    return response.json();
  });
};

export const fetchUser = (email: string, password: string, setError: React.Dispatch<React.SetStateAction<string>>): Promise<any> => {
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

export const destroyToken = (): Promise<any> => {
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

export const updateUser = (user: any, body: any): Promise<any> => {
  return fetch(
    "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem('token') ?? ''
      },
      body: JSON.stringify({
        data: {
          id: Number(user.data.id),
          type: "user",
          attributes: {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: body.password || "",
            password_confirmation: body.password_confirmation || "",
            current_password: body.current_password
          }
        }
      })
    }
  ).then((response) => {
    // sessionStorage.removeItem('token')
    return response.json();
    // console.log(response)
  });
}