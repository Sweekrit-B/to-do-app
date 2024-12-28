//import { get, handleAPIError } from "src/api/requests";

//import type { APIResult } from "src/api/requests";

export interface User {
  _id: string;
  name: string;
  profilePictureURL?: string;
}

/*
function parseUser(user: User): User {
  return {
    _id: user._id,
    name: user.name,
    profilePictureURL: user.profilePictureURL,
  };
}

export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = (await response.json()) as User;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
*/
