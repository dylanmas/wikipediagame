<script>
  import firebase from "../fb";
  import { getAuth, signOut } from "firebase/auth";
  import { goto } from "$app/navigation";

  function handleSignOut() {
    const auth = getAuth();

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
