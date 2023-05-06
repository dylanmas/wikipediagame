<script>
  import firebase from "../fb";
  import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { getFirestore, getDoc, doc } from "firebase/firestore";
  import { onMount } from "svelte";

  const auth = getAuth();
  const db = getFirestore(firebase);
  let curDocument = {};

  let firebaseAuth = getAuth();

  let loaded = false;

  var docSnapData = "";

  onMount(async () => {
    curDocument = await getTheDocument();
    // console.log(await curDocument.data().username);
    console.log(await curDocument);
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

    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        // userText = "User Logged In: " + user.email;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }

        docSnapData = docSnap.data();
        loaded = true;
        return docSnap.data();
      } else {
        console.log("You aren't logged in.");
        return null;
      }
    });

    /*
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return docSnap;*/
  }
</script>

<!--
{#await curDocument}

{:then data}

{:catch error}
<p>The error was {error.message}</p>
{/await}
-->

{#if loaded === true}
<img class="absolute w-full h-[100vh] brightness-50 " src="https://picsum.photos/600/600" />
<div class="absolute top-0 w-full p-4 h-[100vh] transition-in backdrop-blur-3xl">
  <div class="w-full rounded-lg shadow-md bg-black overflow-clip flex flex-col">
    <img  class="w-full h-96 rounded-lg" src="https://picsum.photos/600/600" />
    <div class="p-4 flex flex-col gap-2">
      <img  class="w-20 h-20 rounded-full" src="https://picsum.photos/600/600" />
      <h1 class="text-6xl font-bold mb-2">{docSnapData.username}</h1>
  
      <h1>UID: {docSnapData.uid}</h1>
      <h1>Email: {docSnapData.email}</h1>
      
      <div class="flex gap-2">
        <button
        on:click={() => goto("/")}
        class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
        >
        Home
        </button>
        <button
          on:click={handleSignOut}
          class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
</div>
{:else}
<div class="flex w-full h-[100vh]">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-auto w-10 h-10 animate-spin mx-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
</div>
{/if}