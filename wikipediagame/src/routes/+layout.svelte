<script>
  import "../app.css";
  import { onMount } from "svelte";
  import firebase from "./fb";

  onMount(() => {
    // firebase.auth().onAuthStateChange((user) => {
    //   if (user) {
    //     console.log("user " + user + " is logged in");
    //   } else {
    //     console.log("Not Logged In");
    //   }
    // });
  });
</script>

<slot />
