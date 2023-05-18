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

  const goToArticle = async (articleName) => {
    title = articleName;
    
    sections = "";
    sections = [];

    let doctmp = await wtf.fetch(articleName);
    let doc = doctmp.json({categories: false});
    tmp = doc.sections;

    console.log(tmp);

    let totalIndex = 0;

    for (let index1 = 0; index1 < tmp.length; index1++) {
      let tmp2 = tmp[index1].paragraphs;

      if (tmp2 !== undefined) {
        for (let index2 = 0; index2 < tmp2.length; index2++) {
          let tmp3 = tmp2[index2].sentences;
          let foo = "";

          if (tmp3 !== undefined) {
            for (let index3 = 0; index3 < tmp3.length; index3++) {
              let tmp4 = tmp3[index3].text;

              if (tmp4 !== undefined) {
                console.log(tmp4);
                foo += tmp4 + " ";
              }
              
            }        
            sections[totalIndex] = foo;
            totalIndex++;
          }
        }
      }
    }

    console.log(sections);
  }

  var link = "";

  var goToArticle2 = (query) => {
    fetch(`https://en.wikipedia.org/w/api.php?action=parse&prop=text|images&page=${query}&format=json&origin=*`, {
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
  }

  var pathStack = [];
  var pathIndex = 0;
  var content;
  let query = "";
  var seconds = 0;
  
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
</script>

<SC.Canvas
  antialias
  background={new THREE.Color("rgb(59, 130, 246)")}
  fog={new THREE.FogExp2("papayawhip", 2)}
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

<div
  class="h-[100vh] w-full flex flex-col p-4 gap-4 z-10 text-white absolute transition-in"
>
  <div class="flex-col bg-black p-4 gap-4 rounded-lg shadow-lg items-center">
    <div class="flex items-center gap-2">
        <img src="https://picsum.photos/500/500" class="w-14 h-14 rounded-full shadow-md border-4 border-blue-500" />
        <img src="https://picsum.photos/500/501" class="w-14 h-14 rounded-full shadow-md border-4 border-red-500" />
        <img src="https://picsum.photos/500/502" class="w-14 h-14 rounded-full shadow-md border-4 border-blue-500" />
        <div class="w-full"></div>
        <h1 class="text-5xl font-bold font-mono px-4 pt-2 pb-1 bg-neutral-800 rounded-md">{seconds < 10 ? "0" : ""}{seconds}</h1>
    </div>
</div>

<div class="h-full flex gap-4 overflow-clip">
    <div class="flex flex-col gap-4">
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

    <div
      class="bg-white w-full h-full backdrop-blur-md bg-opacity-70 text-black rounded-lg shadow-lg flex flex-col p-2"
    >
    
      <h1 class="font-bold text-3xl">{title}</h1>
      <div class="flex flex-col items-center gap-2 h-full">
        <div bind:this={content} class="content overflow-y-auto overflow-x-hidden">
          {@html link}
        </div>
        <!-- {#each sections as sectionInfo} 
        <h1 class="text-left mr-auto">{sectionInfo}</h1>
        {/each} -->
        <!-- <iframe src={link} id="iframeInner" class="w-full h-full rounded-lg shadow-lg font-bold backdrop-opacity-100" /> -->
      </div>
    </div>
  </div>
</div>

<slot> </slot>