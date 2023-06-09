<script>
    import { onMount } from "svelte";
    import { path_val } from "../../stores.js";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    onMount(() => {
        let foo = $page.url.pathname;
        foo = foo.substring(foo.indexOf("/") + 1);
        foo = foo.substring(foo.indexOf("/") + 1);

        path_val.update((previous) => previous += foo + "``");
        path_val.subscribe((n) => {console.log(n)});

        // goto("/wiki");
    })
</script>

<div>

</div>