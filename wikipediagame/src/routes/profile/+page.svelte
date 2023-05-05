<script>
  import firebase from "../fb";
  import { getAuth, signOut } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { getFirestore, getDoc, doc } from "firebase/firestore";
  import { onMount } from "svelte";

  const auth = getAuth();
  const db = getFirestore(firebase);
  let curDocument;

  onMount(async () => {
    curDocument = await getTheDocument();
    console.log(curDocument);
  });
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.setItem("uid", null);
        localStorage.setItem("isLoggedIn", false);
        goto("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  }

  async function getTheDocument() {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
</script>

<div class="m-3">
  <h1 class="text-5xl">Profile</h1>

  <p>{curDocument.username}</p>
  <p>{curDocument.email}</p>
  <p>{curDocument.uid}</p>

  <button
    on:click={handleSignOut}
    class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2"
  >
    Sign Out
  </button>
</div>
