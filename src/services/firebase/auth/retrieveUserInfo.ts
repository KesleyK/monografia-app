import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { IUser } from "../../../models/IUser";
import { DBCollection } from "../db/collectionsMapping";
import { convertUser } from "../db/convertUser";

export async function retrieveUserInfo(): Promise<IUser> {
    const user = getAuth().currentUser;
    const teste = await getDoc(doc(db, DBCollection.USERS, user.email));

    return convertUser(teste);
}