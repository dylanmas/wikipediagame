<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

    let spin = 2;
    let vel = true;

    SC.onFrame(() => {
        if (vel) {
            spin += 0.001;
        } else {
            spin -= 0.001;
        }

        if (spin >= 3 || spin <= -1) {
            vel = !vel;
        }
    })
</script>

<SC.Canvas antialias background={new THREE.Color("rgb(59, 130, 246)")} fog={new THREE.FogExp2('papayawhip', 2)}>

    <SC.Group position={[-20, 0, 0]} rotation={[spin, spin, spin]}>
        {#each Array(40) as arr, i}
            {#each Array(40) as arr2, j}
                <SC.Mesh geometry={new THREE.BoxGeometry()}
                    material={new THREE.MeshStandardMaterial({ color: 0x505050 })}
                    position={[((i * 3 - 20)), ((Math.pow(i, 2)) * -0.1), (j * 3 - 20)]}
                    rotation={[Math.random(), Math.random(), Math.random()]}
                />    
            {/each}
        {/each}
    </SC.Group>
	<SC.PerspectiveCamera position={[-40, (spin - 10), 20]} />
    <SC.AmbientLight intensity={0.6} />
    <SC.DirectionalLight intensity={0.6} position={[-20, 3, 2]} />

</SC.Canvas>

<div class="h-[100vh] w-full flex flex-col p-4 gap-4 z-10 text-white absolute transition-in">
    <div class="flex">
        <h1 class="font-bold text-[100px] z-0 -rotate-[15deg] -translate-y-4 -translate-x-4 text-black">Wikiroyale</h1>
        <div class="bg-black rounded-lg shadow-lg p-4 w-full flex flex-col gap-2">
            <h1 class="font-bold text-3xl">Articles of the day:</h1>
            <div class="w-full flex">
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex">
                        <button class="rounded-lg h-96 w-full shadow-md bg-red-500 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:">
                            <img class="w-full" src="https://picsum.photos/500/500" />
                        </button>
                        <button class="rounded-lg shadow-md p-4 ml-4 bg-neutral-500 overflow-clip text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </button>
                    </div>localhost:3000/execute/starlocalhost:3000/execute/startservertserver
                    <h1 class="text-5xl">Articlelocalhost:3000/execute/startserver name</h1>
                    <h1 class="text-xl">Article contents and summary</h1>
                </div>
            </div>
        </div>
        <div class="bg-black h-48 rounded-lg shadow-lg p-4 ml-4">
            <h1 class="">Profile and settings go here</h1>
        </div>
    </div>

    <div class="bg-white text-black rounded-lg shadow-lg p-4 w-full flex flex-col gap-2 mt-auto">
        <h1 class="font-bold text-3xl">Play:</h1>
        <div class="flex items-center gap-4">
            <button class="w-96 h-48 rounded-lg shadow-md bg-red-500 overflow-clip p-4 text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:">
                <h1 class="text-5xl">Battle Royale</h1>
            </button>
            <button class="w-96 h-48 rounded-lg shadow-md bg-red-500 overflow-clip p-4 text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:">
                <h1 class="text-5xl">5v5</h1>
            </button>
            <button class="w-96 h-48 rounded-lg shadow-md bg-red-500 overflow-clip p-4 text-white transition-all duration-250 hover:border-4 hover:bg-red-900 hover:shadow-blue-500 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500 hover:">
                <h1 class="text-5xl">Singleplayer</h1>
            </button>
        </div>
    </div>
</div>