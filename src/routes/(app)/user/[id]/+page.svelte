<script lang="ts">
  import BlogCard from "$lib/components/BlogCard.svelte";
  import ProfileHeader from "$lib/components/ProfileHeader.svelte";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;
</script>

<svelte:head>
  <title>Blog | @{data.user.username}</title>
</svelte:head>

<ProfileHeader {...data.user} />
<span class="block mb-4" />
{#if data.user.blogs.length !== 0}
  <div class="headline-medium">Blogs posted by user :</div>
  <span class="block mb-6" />
  <div class="columns-1 gap-8 md:columns-2 lg:columns-3 max-w-7xl">
    {#each data.user.blogs as blog}
      <BlogCard author_username={data.user.username} {...blog} />
    {/each}
  </div>
{/if}
