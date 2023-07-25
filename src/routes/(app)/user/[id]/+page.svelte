<script lang="ts">
  import BlogCard from "$lib/components/BlogCard.svelte";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;
</script>

<div class="display-large mb-4">
  {data.user?.first_name}
  {data.user?.last_name}
</div>
<div class="display-small">
  - @{data.user.username}
</div>

<span class="block mb-10" />
<div class="columns-1 gap-8 md:columns-2 lg:columns-3 max-w-7xl">
  {#each data.user.blogs as blog}
    <BlogCard author_username={data.user.username} {...blog} />
  {/each}
</div>
