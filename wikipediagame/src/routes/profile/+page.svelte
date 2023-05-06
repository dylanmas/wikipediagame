<script>
  import firebase from "../fb";
  import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { getFirestore, getDoc, doc, getDocs } from "firebase/firestore";
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
  }

  async function changeUsername() {
    let password = document.getElementById("pass-input").value;
    let newUsername = document.getElementById("new-user-input").value;

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(newUsername + "    " + doc.data().username);
      if (newUsername == doc.data().username) {
        console.log("name in use");
        return;
      }
    });

    if (password != passConfirm) {
      console.log("the passwords are different");
      return;
    }
  }
</script>

{#if loaded === true}
  <div class="m-3">
    <h1 class="text-5xl">Profile</h1>

    <h1>Username: {docSnapData.username}</h1>
    <h1>UID: {docSnapData.uid}</h1>
    <h1>Email: {docSnapData.email}</h1>

    <button
      on:click={() => goto("/")}
      class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2"
    >
      Home
    </button>
    <button
      on:click={handleSignOut}
      class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2"
    >
      Sign Out
    </button>
    <br />
    <h1 class="text-3xl mt-12">Change Username</h1>

    <input
      class="text-black h-auto rounded-lg m-3 ml-0 p-2"
      type="email"
      name="email"
      id="new-user-input"
      placeholder="New Username"
    />
    <input
      class="text-black rounded-lg m-3 p-2"
      type="password"
      name="email"
      placeholder="Password"
      id="pass-input"
    />

    <button
      on:click={changeUsername}
      class="m-3 text-lg bg-white text-black w-1/6 rounded-lg text-center p-2"
      >Submit</button
    >
  </div>
{/if}
