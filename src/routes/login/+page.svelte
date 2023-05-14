<script>
  import { goto } from "$app/navigation";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { getTheDoc } from "../../firebase-constants";
  import firebase from "../fb";

  const auth = getAuth();
  var error = "";

  async function login() {
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("pass-input").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("isLoggedIn", true);

        await getTheDoc();
        goto("/");
      })
      .catch((err) => {
        //error = err.code;
        error = err.message.substring(err.message.indexOf(":") + 1);
      });
  }
</script>

<div
  class="absolute top-0 w-full p-4 h-[100vh] transition-in backdrop-blur-3xl flex flex-col"
>
  <h1 class="font-bold text-6xl text-center mb-10 mt-auto">Wikiroyale</h1>
  <div
    class="w-4/12 mx-auto rounded-lg shadow-md bg-black overflow-clip flex flex-col mb-auto"
  >
    {#if error != ""}
      <h1 class="p-4 bg-red-300 font-bold text-red-900">{error}</h1>
    {/if}
    <div class="p-4 flex flex-col gap-2">
      <div class="flex flex-col text-white justify-center">
        <div class="flex flex-col w-full">
          <h1 class="text-4xl font-bold mb-10">Login</h1>
          <div class="flex flex-col w-full flex-stretch mb-10">
            <input
              class="text-black h-auto rounded-lg p-2 bg-neutral-300 shadow-md w-full mt-4"
              type="email"
              name="email"
              id="email-input"
              placeholder="Email Address"
              value="aabaac@g.com"
            />
            <input
              class="text-black h-auto rounded-lg p-2 bg-neutral-300 shadow-md w-full mt-2"
              type="password"
              name="email"
              placeholder="Password"
              id="pass-input"
              value="123456"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-2">
        <button
          on:click={() => goto("/")}
          class="mt-4 text-lg bg-white text-black w-full rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
        >
          Back
        </button>
        <button
          on:click={login}
          class="mt-4 text-lg bg-white text-black w-full rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
        >
          Login
        </button>
      </div>

      <a href="/signup" class="text-small text-sm mt-2">Make an account </a>
    </div>
  </div>
</div>
