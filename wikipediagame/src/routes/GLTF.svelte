<script>
  import * as SC from 'svelte-cubed';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { onMount } from 'svelte';
  // import * as modelURL from '../../static/test.glf'
//   import { modelURL } from './stores';

  // const modelURL = 'https://threejs.org/manual/examples/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf'
  let model = null;

  function loadGLTF() {
    const loader = new GLTFLoader();
    return loader.loadAsync("models/scene.gltf");
  }

  onMount(async () => {
    await loadGLTF().then(_model => model = _model);
    console.log(model);
  })

</script>

{#if model}
  <SC.Primitive
    object={model.scene}
    scale={[10,10,10]}
  />
{/if}