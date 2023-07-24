<script lang="ts">
  import BlogCard from "$lib/components/BlogCard.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div class="display-large">Latest Blogs</div>
<span class="h-8 block" />
{#if data.blogs.length === 0}
  <div class="display-small">No Blogs :(</div>
{/if}

<!-- Blog Card Container -->
<!-- <div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl"> -->
<div class="columns-1 gap-8 md:columns-2 lg:columns-3 max-w-7xl">
  {#each data.blogs as blog}
    <BlogCard {...blog} />
  {/each}
</div>
