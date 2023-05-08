<script>
    import {goto} from "$app/navigation"
</script>

<button
    on:click={() => goto("/")}
    class="mt-3 text-lg bg-white text-black w-1/8 rounded-lg text-center p-2 transition-all bg-neutral-700 rounded-lg shadow-md p-4 duration-250 hover:bg-neutral-400 hover:scale-105 active:scale-95 hover:accent-blue-500 hover:shadow-xl border-blue-500"
    >
    Home
</button>