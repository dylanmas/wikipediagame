<script>
  import { goto } from "$app/navigation";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import firebase from "../fb";

  const auth = getAuth();

  async function login() {
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("pass-input").value;
    // let email = "a@b.com";
    // let password = "123456";

    console.log(email);
    console.log(password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("isLoggedIn", true);
        goto("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
      });
  }
</script>

<div
  class="h-[100vh] w-full flex flex-col p-4 gap-4 z-10 text-white absolute transition-in justify-center self-center"
>
  <div class="flex flex-col w-screen">
    <h1 class="m-3 text-4xl">Sign Up</h1>
    <div class="flex flex-col w-1/3 flex-stretch">
      <input
        class="text-black h-auto rounded-lg m-3 p-2"
        type="email"
        name="email"
        id="email-input"
        placeholder="Email Address"
      />
      <input
        class="text-black rounded-lg m-3 p-2"
        type="password"
        name="email"
        placeholder="Password"
        id="pass-input"
      />

      <button
        on:click={login}
        class="m-3 text-lg bg-white text-black w-1/3 rounded-lg text-center p-2"
        >Sign Up</button
      >
      <a href="/login" class="text-small w-1/2 hover p-2 mb-3 text-sm ml-3"
        >I Have A Login</a
      >
    </div>
  </div>
</div>
