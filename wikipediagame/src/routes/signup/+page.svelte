<script>
  import { goto } from "$app/navigation";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    collection,
  } from "firebase/firestore";
  import firebase from "../fb";

  const auth = getAuth();
  const db = getFirestore(firebase);

  var error = "";

  async function login() {
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("pass-input").value;
    let passConfirm = document.getElementById("pass-input-confirm").value;
    let name = document.getElementById("name-input").value;

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(name + "    " + doc.data().username);
      if (name == doc.data().username) {
        console.log("name in use");
        return;
      }
    });

    if (password != passConfirm) {
      console.log("the passwords are different");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("isLoggedIn", true);

        try {
          await setDoc(doc(db, "users", user.uid), {
            username: name,
            uid: user.uid,
            email: email,
            password: password,
          });

          console.log("wrote to document");

          goto("/");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((err) => {
        const errorCode = err.code;
        error = err.message.substring(err.message.indexOf(":") + 1);

        console.log(errorMessage);
      });
  }
</script>

<div class="absolute top-0 w-full p-4 h-[100vh] transition-in backdrop-blur-3xl flex flex-col">
  <h1 class="font-bold text-6xl text-center mb-10 mt-auto">Wikiroyale</h1>
  <div class="w-4/12 mx-auto rounded-lg shadow-md bg-black overflow-clip flex flex-col mb-auto">
    {#if error != ""}
    <h1 class="p-4 bg-red-300 font-bold text-red-900">{error}</h1>
    {/if}
    <div class="p-4 flex flex-col gap-2">
      <div
        class="flex flex-col text-white justify-center"
      >
        <div class="flex flex-col w-full">
          <h1 class="text-4xl font-bold mb-10">Sign up</h1>
          <div class="flex flex-col w-full flex-stretch mb-10">

            <input
              class="text-black h-auto rounded-lg p-2 bg-neutral-300 shadow-md w-full mt-4"
              type="text"
              name="usernane"
              placeholder="Username"
              id="name-input"
            />
            <input
              class="text-black h-auto rounded-lg p-2 bg-neutral-300 shadow-md w-full mt-2"
              type="email"
              name="email"
              id="email-input"
              placeholder="Email Address"
            />
            <input
              class="text-black h-auto rounded-lg p-2 bg-neutral-300 shadow-md w-full mt-2"
              type="password"
              name="pass"
              placeholder="Password"
              id="pass-input"
            />
            <input
              class="text-black h-auto rounded-lg p-2 bg-neutral-300 shadow-md w-full mt-2"
              type="password"
              name="pass confirm"
              placeholder="Confirm Password"
              id="pass-input-confirm"
            />

          </div>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button
          on:click={login}
          class="mt-4 text-lg bg-white text-black w-full rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
          >Sign Up</button
        >
      </div>

      <a href="/login" class="text-small text-sm mt-2"
        >I have a login
      </a>

    </div>
  </div>
</div>