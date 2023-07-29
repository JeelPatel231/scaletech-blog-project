<script lang="ts">
  import BlogCard from "$lib/components/BlogCard.svelte";
  import ProfileHeader from "$lib/components/ProfileHeader.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<ProfileHeader {...data.userData} />

<span class="block h-8" />
<div class="display-small mb-4 !underline underline-offset-8">
  Account Details
</div>
<div class="body-large">
  Creation Date : {data.userData.account_created}
</div>
<span class="block h-8" />
<div class="display-small mb-4 !underline underline-offset-8">
  Blogs written by you
</div>
{#if data.userData.blogs.length === 0}
  <div class="body-large">No Blogs Posted Yet!</div>
{/if}
<div class="columns-1 gap-8 md:columns-2 lg:columns-3 max-w-7xl">
  {#each data.userData.blogs as blog}
    <BlogCard author_username={data.userData.username} {...blog} />
  {/each}
</div>
