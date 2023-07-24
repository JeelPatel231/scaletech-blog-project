<script lang="ts">
  import NavRail from "$lib/components/NavRail.svelte";
  import type { LayoutServerData } from "../$types";
  export let data: LayoutServerData;
</script>

<div class="app-layout">
  <NavRail user={data.user} />
  <div class="p-8 area-content overflow-auto">
    <slot />
  </div>
</div>

<style lang="scss">
  .app-layout {
    display: grid;
    height: 100vh;
    grid-template:
      "content" 1fr
      "navbar" 80px / 1fr;

    @media (min-width: 640px) {
      grid-template: "navbar content" / 80px 1fr;
    }
  }

  .area-content {
    grid-area: content;
  }
</style>
