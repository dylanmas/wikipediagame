import firebase from "./routes/fb";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";

export let firebaseAuth = getAuth(firebase);
export let db = getFirestore(firebase);
export let docLoaded = false;

if (firebaseAuth.currentUser) {
  let tempDoc = await getDoc(doc(db, "users", firebaseAuth.currentUser.uid));

  if (tempDoc.exists()) {
    curDoc = tempDoc.data();
  }
  // updateDoc();
  docLoaded = true;
} else {
  docLoaded = false;
}

export async function updateDoc() {
  if (firebaseAuth.currentUser) {
    let docData = curDoc.data();

    if (docData.level == null) {
      const updateDocVals = doc(db, "users", firebaseAuth.currentUser.uid);
      await updateDoc(updateDocVals, {
        level: 1,
      });
    }
    if (docData.plays == null) {
      const updateDocVals = doc(db, "users", firebaseAuth.currentUser.uid);
      await updateDoc(updateDocVals, {
        plays: 0,
      });
    }

    if (docData.wins == null) {
      const updateDocVals = doc(db, "users", firebaseAuth.currentUser.uid);
      await updateDoc(updateDocVals, {
        wins: 0,
      });
    }

    curDoc = await getDoc(doc(db, "users", firebaseAuth.currentUser.uid));
  } else {
    docLoaded = false;
    console.log(docLoaded);
  }
}

export async function getTheDoc() {
  if (firebaseAuth.currentUser) {
    let tempDoc = await getDoc(doc(db, "users", firebaseAuth.currentUser.uid));

    if (tempDoc.exists()) {
      curDoc = tempDoc.data();
      docLoaded = true;
    }

    console.log("got the data");
  }
}

export function removeCurDoc() {
  curDoc = "";
  docLoaded = false;
}

export let curDoc = "sdfsdf";
