import { NewUser } from "./utils/utils";

export const postNewUser = (newUser: NewUser) => {
  return fetch("http://localhost:3001/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newUser,
    }),
  });
};
