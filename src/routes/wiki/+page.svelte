<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Loadingscreen from "../components/loadingscreen.svelte";

    var foo = false;
    var foo1 = false;
    var foo2 = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onMount(async () => {
        while (true) {
            foo = !foo;
            await sleep(5000);
            foo1 = !foo1
            await sleep(1500);
        }
    })

    onMount(async () => {
      while(true) {
        if (isloadedall == 2) {
          setTimeout(() => {
              foo2 = true;
          }, 2000);
        }
        await sleep(250);
      }
    })

    var pause = false;
    var countdown = 3;
    var isloaded = false;
    var isloadedscreen = false;
    var clearall = false;
    //simulated load:

    var enterGame = () => {
      goto(`/wiki/${query}`);
    }

    var query = "";

    var goToArticle2 = async (query) => {
      await fetch(`https://en.wikipedia.org/w/api.php?action=parse&prop=text|images&page=${query}&format=json&origin=*`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(async (res) => {
        let foo = await res.json();
        // console.log(foo.parse.text['*']);
      })
    }
    
    onMount(()=>{
        setTimeout(async() => {
        isloaded = true;
            await sleep(1000);
            isloadedscreen = true;
            setInterval(async () => {
                countdown--
                if (countdown <= 0) {
                    clearall = true;
                }
            }, 1000);
        }, 8000)

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

    })

    var isloadedall = 0;

    var increment = () => {
      isloadedall++;
      console.log(isloadedall);
    }


</script>

<div class="{pause == true ? "" : "translate-x-[120%]"} z-40 transition-all duration-500 fixed w-96 h-[100vh] gap-4 m-4 right-0 rounded-lg shadow-lg bg-black backdrop-blur-md bg-opacity-70 p-4 flex flex-col">
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
      Players
    </button>
   <button
      class="rounded-lg shadow-md p-2 bg-neutral-800 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:"
    >
      Give up
    </button>
</div>

{#if isloadedscreen}
<div class="wipein flex flex-col h-[100vh] w-full items-center transition-all {clearall ? "bg-green-800" : "bg-blue-500"}">
    <h1 class="text-3xl mt-auto transition-all duration-500 {clearall ? "opacity-0 scale-90" : ""}">Get ready!</h1>
    <h1 class="text-9xl mb-10 font-bold transition-all duration-500 {clearall ? "opacity-0 scale-90" : ""}">{countdown}</h1>

    {#if clearall}
    <div class="absolute w-full h-[100vh] flex flex-col mb-10 items-center transition-all duration-500 transition-in">
      <h1 class="text-7xl mt-auto font-bold">The game has started!</h1>
      <button class="p-4 mb-auto bg-black rounded-lg text-5xl mt-4 font-bold shadow-lg transition-all hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500" on:click={enterGame}>Enter game</button>
    </div>
    {/if}

    <h1 class="text-3xl transition-all duration-500 {clearall ? "opacity-0 scale-90" : ""}">Your path is:</h1>
    <h1 class="text-5xl font-bold flex items-center transition-all duration-500 mb-auto {clearall ? "opacity-0 scale-90" : ""}">{query} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg> Adolf Hitler</h1>
  </div>
{:else}
<div class="flex w-full h-[100vh] p-4 overflow-clip transition-all duration-500 {isloadedall == 2 ? "" : "scale-0"} {isloaded ? "scale-90 opacity-0" : ""}">
    <div class="relative w-full overflow-clip rounded-3xl shadow-lg">
        <div class="w-[400px] absolute z-30 p-4 rounded-2xl bg-black backdrop-opacity-10 backdrop-blur-xl font-bold text-5xl duration-100 m-4 {foo2 == false ? "-translate-x-[5%] opacity-0" : "translate-x-[0%] opacity-100"}">
            Intermission...
            <h1 class="font-normal text-xl mt-4">We're waiting for more players to join.</h1>
        </div>
        <div class="absolute right-0 z-30 p-4 rounded-2xl bg-black backdrop-opacity-10 backdrop-blur-xl font-bold text-5xl duration-100 m-4 {foo2 == false ? "-translate-x-[5%] opacity-0" : "translate-x-[0%] opacity-100"}">
            <button on:click={() => {pause = true;}} class="transition-all active:text-blue-500 m-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </button>
        </div>
        {#if !foo1}
        <img src="https://picsum.photos/800/601" on:load={increment} class="absolute rounded-3xl w-full h-full transition-all shadow-lg duration-[1.5s] z-10 {foo == true ? "-translate-x-[50%] brightness-50" : "translate-x-[0%]"}" />
        <img src="https://picsum.photos/800/600" on:load={increment} class="absolute rounded-3xl w-full h-full transition-all shadow-lg duration-[1.5s] z-20 {foo == true ? "translate-x-[0%]" : "translate-x-[100%]"}" />
        {:else}
        <img src="https://picsum.photos/800/600" class="absolute rounded-3xl w-full h-full transition-all shadow-lg duration-[1.5s] z-10 {foo == false ? "-translate-x-[50%] brightness-50" : "translate-x-[0%]"}" />
        <img src="https://picsum.photos/800/601" class="absolute rounded-3xl w-full h-full transition-all shadow-lg duration-[1.5s] z-20 {foo == false ? "translate-x-[0%]" : "translate-x-[100%]"}" />
        {/if}
        <div class="w-[400px] absolute z-30 p-4 right-0 bottom-0 rounded-2xl bg-black backdrop-opacity-10 backdrop-blur-xl font-bold text-5xl duration-100 m-4 {foo2 == false ? "-translate-x-[5%] opacity-0" : "translate-x-[0%] opacity-100"}">
            <h1 class="mb-4">3/10 players</h1>
            <!--This should be referring to a players array-->
            {#each Array(3) as arr}
              <h1 class="bg-white rounded-md shadow-lg text-black text-center text-lg mb-2">Player placeholder</h1>
            {/each}
        </div>
    </div>
</div>

<div class="{isloadedall == 2 ? "hidden" : ""}">
  <Loadingscreen />
</div>

{/if}
