import firebase from "./routes/fb"
import {getAuth} from "firebase/auth"
import {getFirestore, getDoc, doc} from "firebase/firestore"

export let firebaseAuth = getAuth(firebase);
export let db = getFirestore(firebase);
export let docLoaded = false;

if(firebaseAuth.currentUser)
{
    curDoc = await getDoc(doc(db, "users", firebaseAuth.currentUser.uid));
    docLoaded = true;
}
else
{
    docLoaded = false;
}

export async function updateDoc()
{
    if (firebaseAuth.currentUser)
    {
        curDoc = await getDoc(doc(db, "users", firebaseAuth.currentUser.uid));
        docLoaded = true;
    }
    else
    {
        docLoaded = false;
    }
}

export function removeCurDoc()
{
    curDoc = "";
    docLoaded = false;
}

export let curDoc = "";