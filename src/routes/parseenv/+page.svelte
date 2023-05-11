<script>
    import { onMount } from 'svelte';
    import wtf from 'wtf_wikipedia';

    var tmp = "";

    var sections = [];

    onMount(async () => {
        let doc = await wtf.fetch('Whistling')

        tmp = doc._sections;

        let totalIndex = 0;

        tmp.forEach(element => {
            let element2 = element._paragraphs
            for (let index = 0; index < element2.length; index++) {
                sections[totalIndex] = element2[index].data.wiki;
                totalIndex++;
            }
        });

        console.log(sections);
    })
</script>

{#each sections as sectionInfo}
<h1 class="mb-5">{sectionInfo}</h1>
{/each}