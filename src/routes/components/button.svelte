<script>
    export var title = "";
    export var classes;
    export var callback;
</script>

<button
    on:click={callback}
    class={classes}
    >
    {title}
</button>


