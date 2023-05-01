<script>
  import "../app.css";
  import App from "./fb";
  import { onMount } from "svelte";

  // import { getAuth, onAuthStateChange } from "firebase/auth";
  import { getAuth } from "firebase/auth";
  import { goto } from "$app/navigation";

  // onMount(() => {
  //   const auth = getAuth();
  //   onAuthStateChange(auth, (user) => {
  //     if (user) {
  //       console.log("user " + user + " is logged in");
  //     } else {
  //       goto("/signin");
  //     }
  //   });
  // });
</script>

<slot />
