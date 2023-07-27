<script lang="ts">
  import BlogCard from "$lib/components/BlogCard.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div class="display-large">Tagged with #{data.tag}</div>
<span class="h-8 block" />
{#if data.blogs.length === 0}
  <div class="display-small">No Blogs found with tag - {data.tag}</div>
{/if}

<div class="columns-1 gap-8 md:columns-2 lg:columns-3 max-w-7xl">
  {#each data.blogs as blog}
    <BlogCard author_username={blog.author.username} {...blog} />
  {/each}
</div>
