<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import wtf from 'wtf_wikipedia';
  import { onMount } from 'svelte';
  import { path_val } from "../stores.js";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let spin = 2;
  let vel = true;

  var sectionsInfo = "";
  var title = "";

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

  var tmp = "";
  var sections = [];
  var link = "";

  var goToArticle2 = async (query) => {
    load = true;
    await fetch(`https://en.wikipedia.org/w/api.php?action=parse&prop=text|images&page=${query}&format=json&origin=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(async (res) => {
      let foo = await res.json();
      // console.log(foo.parse.text['*']);

      link = foo.parse.text['*'];
    })
    load = false;
  }

  var pathStack = [];
  var pathIndex = 0;
  var content;
  let query = "";
  var seconds = 0;
  var load = false;
  
  onMount(async () => {

    fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&origin=*', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(async (res) => {
      let foo = res.json();
      let tst = await foo;

      query = await tst.query.random[0].title

      // goToArticle(query);
      goToArticle2(query);
    })

    // path_val.subscribe((n) => {console.log(n)});
    
    page.subscribe((n) => {
      let foo = n.url.pathname;
      foo = foo.substring(foo.indexOf("/") + 1);
      foo = foo.substring(foo.indexOf("/") + 1);
      path_val.update((previous) => previous += foo + "``");

      let foo2 = foo.replaceAll("_", " ");

      pathStack.unshift(foo2);
      pathStack = pathStack;
      console.log(pathStack);

      goToArticle2(foo);
      content.scrollTop = 0;
    })
  })

  setInterval(() => {
    seconds++;
  }, 1000);

  var pause = false;
</script>

<SC.Canvas
  antialias
  background={new THREE.Color("rgb(59, 130, 246)")}
  
>
  <SC.Group position={[-20, 0, 0]} rotation={[spin, spin, spin]}>
    {#each Array(40) as arr, i}
      {#each Array(40) as arr2, j}
        <SC.Mesh
          geometry={new THREE.BoxGeometry()}
          material={new THREE.MeshStandardMaterial({ color: 0x505050 })}
          position={[i * 3 - 20, Math.pow(i, 2) * -0.1, j * 3 - 20]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        />
      {/each}
    {/each}
  </SC.Group>
  <SC.PerspectiveCamera position={[-40, spin - 10, 20]} />
  <SC.AmbientLight intensity={0.6} />
  <SC.DirectionalLight intensity={0.6} position={[-20, 3, 2]} />
</SC.Canvas>

<div class="{pause == true ? "" : "translate-x-[120%]"} transition-all duration-500 fixed w-96 h-[100vh] gap-4 m-4 right-0 rounded-lg shadow-lg bg-black backdrop-blur-md bg-opacity-70 z-30 p-4 flex flex-col">
  <button on:click={() => {pause = false;}} class="transition-all active:text-blue-500 bg-red-500 mr-auto rounded-lg p-4 shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <h1 class="text-3xl font-bold">Game menu</h1>

  <button
      class="rounded-lg shadow-md p-2 bg-neutral-800 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
    >
      Options
    </button>
    <button
      class="rounded-lg shadow-md p-2 bg-neutral-800 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
    >
      Playerlist
    </button>
   <button
      class="rounded-lg shadow-md p-2 bg-neutral-800 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
    >
      Forfeit
    </button>
</div>

<div
  class="h-[100vh] w-full flex flex-col p-4 gap-4 z-10 text-white absolute transition-in"
>
  <div class="flex-col bg-black p-4 gap-4 rounded-lg shadow-lg items-center">
    <div class="flex items-center gap-2">
        <div class="bg-yellow-600 rounded-full wipein">
          <img src="https://picsum.photos/500/500" class="w-14 h-14 rounded-full shadow-md border-4 border-blue-500" />
          <h1 class="text-center font-bold mb-1">1</h1>
        </div>
        <div class="bg-yellow-600 rounded-full wipein">
          <img src="https://picsum.photos/501/501" class="w-14 h-14 rounded-full shadow-md border-4 border-red-500" />
          <h1 class="text-center font-bold mb-1">1</h1>
        </div>
        <div class="bg-yellow-600 rounded-full wipein">
          <img src="https://picsum.photos/502/502" class="w-14 h-14 rounded-full shadow-md border-4 border-blue-500" />
          <h1 class="text-center font-bold mb-1">1</h1>
        </div>
        <div class="w-full"></div>
        <h1 class="text-5xl font-bold font-mono px-4 pt-2 pb-1 bg-neutral-800 rounded-md">{seconds < 10 ? "0" : ""}{seconds}</h1>
        <button on:click={() => {pause = true;}} class="transition-all active:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
    </div>
</div>

<div class="h-full flex overflow-clip">
    <div class="flex flex-col gap-4 mr-4">
        <div
          class="bg-black backdrop-blur-md bg-opacity-70 rounded-lg shadow-lg p-4 w-[300px] flex flex-col-reverse items-center gap-2"
        >
          <h1 class="text-2xl text-center">{query}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
        </svg>
          <h1 class="font-bold text-3xl text-center">Wikipedia</h1>
        </div>

        <div
          class="bg-black backdrop-blur-md bg-opacity-70  rounded-lg shadow-lg p-4 w-[300px] flex flex-col items-center gap-1"
        >
          <h1 class="text-5xl mb-4">{pathStack.length} step{pathStack.length == 1 ? "" : "s"}</h1>
          {#each pathStack as pathStack, i}
          {#if i != 0}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          {/if}
          <h1 class="p-2 font-bold text-lg bg-black rounded-md shadow-lg text-wrap w-[275px] overflow-clip">{pathStack}</h1>
          {/each}
        </div>
    </div>

    <button on:click={() => {
      if (pathStack.length != 1) {
        pathStack.shift();
        pathStack = pathStack;
        goToArticle2(pathStack[0]);
        // content.scrollTop = 0;
      }
    }} class="bg-neutral-200 z-10 bg-opacity-70 backdrop-blur-lg text-black rounded-l-lg shadow-lg p-4 transition-all hover:bg-opacity-0 hover:invert">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </button>

    <div
      class="bg-white w-full h-full backdrop-blur-md bg-opacity-70 text-black shadow-lg flex flex-col p-2 z-20 rounded-r-lg"
    >
      <h1 class="font-bold text-3xl">{title}</h1>
        <div bind:this={content} class="content overflow-y-auto overflow-x-hidden">
          {#if load}
          <div class="flex flex-col items-center w-full overflow-y-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 animate-spin"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
          {:else}
          {@html link}
          {/if}
        </div>
        <!-- {#each sections as sectionInfo} 
        <h1 class="text-left mr-auto">{sectionInfo}</h1>
        {/each} -->
        <!-- <iframe src={link} id="iframeInner" class="w-full h-full rounded-lg shadow-lg font-bold backdrop-opacity-100" /> -->
    </div>

    <button class="hidden bg-neutral-200 z-10 bg-opacity-70 backdrop-blur-lg text-black rounded-r-lg shadow-lg p-4 transition-all hover:bg-opacity-0 hover:invert">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  </div>
</div>

<slot> </slot>