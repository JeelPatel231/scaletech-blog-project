<script lang="ts">
  import M3Chip from "$lib/components/M3Chip.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  const metaTitle = data.blog.title;
  const metaDesc = `${data.blog.description} - by ${data.blog.author.username}`;
  const metaUrl = `${data.request.origin}/blog/${data.blog.id}`;
  const metaImg = `${data.request.origin}/metaimage.png`;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{data.blog.title}</title>
  <meta name="title" content={metaTitle} />
  <meta name="description" content={metaDesc} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={metaUrl} />
  <meta property="og:title" content={data.blog.title} />
  <meta property="og:description" content={metaDesc} />
  <meta property="og:image" content={metaImg} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={metaUrl} />
  <meta property="twitter:title" content={metaTitle} />
  <meta property="twitter:description" content={metaDesc} />
  <meta property="twitter:image" content={metaImg} />
</svelte:head>

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
