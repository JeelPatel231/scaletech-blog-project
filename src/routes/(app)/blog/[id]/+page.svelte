<script lang="ts">
  import FormPost from "$lib/components/FormPost.svelte";
  import M3Chip from "$lib/components/M3Chip.svelte";
  import Mat3Anchor from "$lib/components/Mat3Anchor.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  const metaTitle = data.blog.title;
  const metaDesc = `${data.blog.description} - by ${data.blog.author.username}`;
  const metaUrl = `${data.request.origin}/blog/${data.blog.id}`;
  const metaImg = `${data.request.origin}/metaimage.png`;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Blog | {data.blog.title} - by {data.blog.author.username}</title>
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

<div class="max-w-5xl relative">
  {#if data.loggedInUser?.username === data.blog.author.username}
    <div class="flex gap-4 w-full justify-end sm:absolute top-0 right-0">
      <Mat3Anchor class="ml-4" href={`/editpost/${data.blog.id}`}>
        <span class="material-symbols-outlined mr-1">edit</span>
        Edit
      </Mat3Anchor>
      <FormPost action={`/api/deleteblog/${data.blog.id}?next=/`}>
        <span class="material-symbols-outlined"> delete </span>
        Delete
      </FormPost>
    </div>
  {/if}
  <div class="flex">
    <div class="display-large mb-4">
      {data.blog.title}
    </div>
  </div>
  <div class="headline-small mb-4">
    Posted on {data.blog.creation_date.toLocaleString()}
  </div>
  <div class="headline-medium mb-8">
    - by
    <a href={`/user/${data.blog.author.username}`} class="!underline">
      {data.blog.author.username}
    </a>
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
          <a href={`/tagged/${encodeURIComponent(tag)}`}>
            {tag}
          </a>
        </M3Chip>
      {/each}
    </div>
  {/if}
</div>
