<script>
  import firebase from "../fb";
  import { getAuth, signOut } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { getFirestore, getDoc } from "firebase/firestore";

  const auth = getAuth();
  const db = getFirestore(firebase);
  console.log(auth);

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
</script>

<div>
  <h1>Profile</h1>

  <button on:click={handleSignOut}> sign out </button>
</div>
