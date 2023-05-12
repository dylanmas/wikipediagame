import firebase from "./routes/fb"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

modules.exports = {
    firebaseAuth: getAuth(firebase),
    firebaseFirestore: getFirestore(firebase),
}