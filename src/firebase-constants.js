import firebase from "./routes/fb"
import {getAuth} from "firebase/auth"
import {getFirestore, getDoc, doc} from "firebase/firestore"

export let firebaseAuth = getAuth(firebase);
export let db = getFirestore(firebase);

let ifDoc = "";

if(firebaseAuth.currentUser)
{
    ifDoc = await getDoc(doc(db, "users", firebaseAuth.currentUser.uid));
}

export async function updateDoc()
{
    if (firebaseAuth.currentUser)
    {
        ifDoc = await getDoc(doc(db, "users", firebaseAuth.currentUser.uid));
    }

    curDoc = ifDoc;
}
export let curDoc = ifDoc;