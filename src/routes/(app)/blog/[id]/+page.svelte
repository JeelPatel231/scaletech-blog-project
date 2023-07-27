<script lang="ts">
  import M3Chip from "$lib/components/M3Chip.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div class="max-w-5xl">
  <div class="display-large mb-4">
    {data.blog.title}
  </div>
  <div class="headline-medium mb-8">
    - by {data.blog.author.username}
  </div>
  <div class="body-large mb-8">
    {data.blog.description}
  </div>
  <div class="markdown-container">
    {@html data.htmlRender}
  </div>
  <span class="block h-10" />
  {#if data.blog.tags.length !== 0}
    <div class="headline-small">Tags</div>
    <div class="flex flex-wrap">
      {#each data.blog.tags as tag}
        <M3Chip>
          <a href={`/tagged/${tag}`}>
            {tag}
          </a>
        </M3Chip>
      {/each}
    </div>
  {/if}
</div>
