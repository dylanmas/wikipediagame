<script>
    var foo = false;
    var foo2 = false;

    setTimeout(() => {
        foo = true;
    }, 5000);
    setTimeout(() => {
        foo2 = true;
    }, 4000);

    var tst = 0;
    setInterval(() => {
        
    }, 5000);
</script>

<div class="flex w-full h-[100vh] p-4 overflow-clip">
    <div class="relative w-full overflow-clip rounded-3xl shadow-lg">
        <div class="w-[400px] absolute z-30 p-4 rounded-br-3xl bg-black backdrop-opacity-10 backdrop-blur-xl font-bold text-5xl duration-100 {foo2 == true ? "-translate-x-[5%] opacity-0" : "translate-x-[0%] opacity-100"}">
            Mirage in the mountains.
            <h1 class="font-normal text-xl mt-4">Burma's mountains encompass everything beautiful about our natural world.</h1>
        </div>
        <img src="https://picsum.photos/1600/801" class="absolute rounded-3xl w-full h-[100vh] transition-all shadow-lg duration-[1.5s] z-10 {foo == true ? "-translate-x-[50%] brightness-50" : "translate-x-[0%]"}" />
        <img src="https://picsum.photos/1600/800" class="absolute rounded-3xl w-full h-[100vh] transition-all shadow-lg duration-[1.5s] z-20 {foo == true ? "translate-x-[0%]" : "translate-x-[100%]"}" />
    </div>
</div>