<script>
  import firebase from "../fb";
  import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import Button from "../components/button.svelte";
  import {
    getFirestore,
    getDoc,
    doc,
    getDocs,
    updateDoc,
    collection,
  } from "firebase/firestore";
  import * as fbConst from "../../firebase-constants";
  import { onMount } from "svelte";

  const auth = fbConst.firebaseAuth;
  const db = fbConst.db;
  let curDocument = fbConst.curDoc;

  let docSnapData = "";

  if (fbConst.docLoaded) {
    docSnapData = curDocument.data();
  }

  let loaded = false;

  var showChangeUsername = false;

  onMount(async () => {
    console.log("on mount");
    loaded = true;
  });

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.setItem("uid", null);
        localStorage.setItem("isLoggedIn", false);
        fbConst.removeCurDoc();
        goto("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  }

  async function changeUsername() {
    let userConfirm = document.getElementById("user-confirm-input").value;
    let newUsername = document.getElementById("new-user-input").value;

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(newUsername + "    " + doc.data().username);
      if (newUsername == doc.data().username) {
        console.log("name in use");
        return;
      }
    });

    if (newUsername != userConfirm) {
      console.log("the passwords are different");
      return;
    }

    const curDoc = doc(db, "users", fbConst.firebaseAuth.currentUser.uid);

    await updateDoc(curDoc, {
      username: newUsername,
    });

    showChangeUsername = false;
  }
</script>

{#if loaded === true}
  <img
    class="absolute w-full h-[100vh] brightness-50"
    src="https://picsum.photos/600/600"
  />
  <div
    class="absolute top-0 w-full p-4 h-[100vh] transition-in backdrop-blur-3xl"
  >
    <div
      class="w-full rounded-lg shadow-md bg-black overflow-clip flex flex-col"
    >
      <img class="w-full h-96 rounded-lg" src="https://picsum.photos/600/600" />
      <div class="p-4 flex flex-col gap-2">
        <img
          class="w-20 h-20 rounded-full"
          src="https://picsum.photos/600/600"
        />
        <h1 class="text-6xl font-bold mb-2">{fbConst.curDoc.username}</h1>

        <div class="flex flex-row">
          <h1 class="mr-1">UID:</h1>
          <h1 class="blur-sm hover:blur-0 transition-all">
            {fbConst.curDoc.uid}
          </h1>
        </div>

        <h1 class="mr-1">Plays: {fbConst.curDoc.plays}</h1>
        <h1 class="mr-1">Wins: {fbConst.curDoc.wins}</h1>
        <h1 class="mr-1">Level: {fbConst.curDoc.level}</h1>
        <h1>Email: {fbConst.firebaseAuth.currentUser.email}</h1>

        <div class="flex gap-2">
          <button
            on:click={() => goto("/")}
            class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
          >
            Home
          </button>
          <button
            on:click={() => {
              showChangeUsername = true;
            }}
            class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
          >
            Change username
          </button>
          <button
            on:click={handleSignOut}
            class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
          >
            Sign out
          </button>
        </div>

        <div
          class="{showChangeUsername != true
            ? 'hidden'
            : ''} absolute top-0 left-0 w-full h-[100vh] flex flex-col backdrop-blur-3xl backdrop-opacity-50"
        >
          <div
            class="mx-auto my-auto bg-white rounded-lg shadow-lg text-black p-4"
          >
            <h1 class="text-3xl font-bold">Change Username</h1>

            <div class="w-full flex flex-col items-center mt-4">
              <input
                class="text-black h-auto rounded-lg p-2 bg-neutral-300 shadow-md w-full"
                type="text"
                name="email"
                id="new-user-input"
                placeholder="New Username"
              />
              <input
                class="text-black rounded-lg p-2 bg-neutral-300 shadow-md w-full mt-2"
                type="text"
                name="email"
                placeholder="Confirm Username"
                id="user-confirm-input"
              />
            </div>

            <div class="flex gap-2">
              <button
                on:click={changeUsername}
                class="mt-3 text-lg text-black w-1/8 rounded-lg text-center transition-all bg-neutral-300 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
                >Submit</button
              >
              <button
                on:click={() => {
                  showChangeUsername = false;
                }}
                class="mt-3 text-lg text-black w-1/8 rounded-lg text-center transition-all bg-neutral-300 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
                >Cancel</button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="flex w-full h-[100vh]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="my-auto w-10 h-10 animate-spin mx-auto"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  </div>
{/if}
