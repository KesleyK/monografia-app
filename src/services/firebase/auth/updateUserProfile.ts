import { IUser } from "../../../models/IUser";
import UsersCollection from "../db/users";

export async function updateUserProfile(user: IUser) {
    return await UsersCollection.put(user.email, user);
}
