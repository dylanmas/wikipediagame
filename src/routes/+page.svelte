<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import firebase from "./fb";
  import { goto } from "$app/navigation";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { getFirestore, getDoc, doc } from "firebase/firestore";
  import Gltf from "./GLTF.svelte";
  import { onMount } from "svelte";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { firebaseAuth, db, curDoc, docLoaded } from "../firebase-constants";
  import Loadingscreen from "./components/loadingscreen.svelte";

  let spin = 2;
  let vel = true;
  let userText = "";
  var docSnapData = "";
  var numWins = 0;
  var numPlays = 0;
  var userLevel = 1;

  SC.onFrame(() => {
    if (vel) {
      spin += 0.001;
    } else {
      spin -= 0.001;
    }

    if (spin >= 3 || spin <= -1) {
      vel = !vel;
    }
  });
  makeUserText();

  function goToSignUp() {
    if (firebaseAuth.currentUser) {
      goto("/profile");
    } else {
      goto("/login");
    }
  }

  async function makeUserText() {
    if (firebaseAuth.currentUser) {
      userText = firebaseAuth.currentUser.email;

      if (curDoc != "") {
        userText = curDoc.username;
      } else {
        userText = firebaseAuth.currentUser.email;
      }
    } else {
      userText = "Log in/Sign up";
    }
  }

  let model = null;

  function loadGLTF() {
    const loader = new GLTFLoader();
    return loader.loadAsync("models/scene.gltf");
  }

  onMount(async () => {
    await loadGLTF().then((_model) => (model = _model));
    console.log(model);
  });
</script>

{#if model}
  <SC.Canvas antialias background={new THREE.Color("rgb(255, 255, 255)")}>
    <SC.Primitive object={model.scene} scale={[10, 10, 10]} />
    <!-- <SC.PerspectiveCamera position={[-40, spin - 10, 20]} /> -->
    <SC.PerspectiveCamera
      position={[-30, spin * -5, -60]}
      near={0.1}
      far={500}
      fov={70}
    />
    <SC.AmbientLight intensity={0.6} />
    <SC.DirectionalLight intensity={0.6} position={[-20, 3, 2]} />
  </SC.Canvas>

  <div
    class="h-[100vh] w-full flex flex-col p-4 gap-4 z-10 text-white absolute transition-in"
  >
    <div class="flex">
      <h1
        class="font-bold text-[100px] z-0 -rotate-[15deg] -translate-y-4 -translate-x-0 text-black"
      >
        Wikiroyale
      </h1>
      <div class="flex flex-col ml-auto gap-4">
        <div
          class="bg-black backdrop-blur-md bg-opacity-70 rounded-lg shadow-lg p-4 gap-2 flex flex-col items-center"
        >
          <div class="flex items-center w-full gap-4 justify-items-end">
            <button
              on:click={() => goToSignUp()}
              class="flex text-2xl items-center transition-all bg-black rounded-lg shadow-md p-2 duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 font-bold"
            >
              <img
                class="w-14 h-14 mr-2 shadow-md rounded-full"
                src="https://picsum.photos/600/600"
                alt="User's profile pic"
              />
              {userText}
            </button>

            {#if firebaseAuth.currentUser}
              <h1 class="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                  />
                </svg>
                {curDoc.wins ? curDoc.wins : 0}
              </h1>

              <h1 class="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                  />
                </svg>
                {curDoc.plays ? curDoc.plays : 0}
              </h1>

              <button
                on:click={goToSignUp}
                class="flex h-full ml-auto text-2xl items-center transition-all bg-black rounded-lg shadow-md p-2 duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 font-bold"
              >
                Friends
              </button>
            {/if}
          </div>

          {#if firebaseAuth.currentUser}
            <div
              class="flex flex-col items-center font-bold text-2xl gap-2 w-full"
            >
              Level {curDoc.level ? curDoc.level : 0}
              <div class="w-full h-1 bg-blue-500 rounded-full" />
            </div>
          {/if}
        </div>

        <div
          class="bg-black rounded-lg shadow-lg p-4 w-full flex flex-col gap-2"
        >
          <h1 class="font-bold text-3xl">Articles of the day:</h1>
          <div class="w-full flex">
            <div class="flex flex-col gap-2 w-full">
              <div class="flex">
                <button
                  class="rounded-l-lg h-48 w-full shadow-md bg-red-500 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
                >
                  <img
                    class="w-full"
                    src="https://picsum.photos/500/500"
                    alt="random profile pic"
                  />
                </button>
                <button
                  class="rounded-r-lg shadow-md p-2 bg-neutral-800 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </button>
              </div>
              <h1 class="text-5xl">Article name</h1>
              <h1 class="text-xl mb-auto">Article contents and summary</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white backdrop-blur-md bg-opacity-70 text-black rounded-lg shadow-lg p-4 w-full flex flex-col gap-2 mt-auto"
    >
      <h1 class="font-bold text-3xl">Play:</h1>
      <div class="flex items-center gap-4">
        <button
          class="w-96 h-48 rounded-lg shadow-md bg-red-500 overflow-clip p-4 text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
        >
          <h1 class="text-5xl">Battle Royale</h1>
        </button>
        <button
          class="w-96 h-48 rounded-lg shadow-md bg-red-500 overflow-clip p-4 text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
        >
          <h1 class="text-5xl">1v1</h1>
        </button>
        <button
          class="w-96 h-48 rounded-lg shadow-md bg-red-500 overflow-clip p-4 text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
        >
          <h1 class="text-5xl">5v5</h1>
        </button>
        <button
          class="w-96 h-48 rounded-lg shadow-md bg-red-500 overflow-clip p-4 text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
          on:click={() => {goto('wiki')}}
        >
          <h1 class="text-5xl">Singleplayer</h1>
        </button>
      </div>
    </div>
  </div>
{:else}
  <Loadingscreen />
{/if}
