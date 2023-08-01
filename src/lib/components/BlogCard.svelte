<script lang="ts">
  export let id: string;
  export let title: string;
  export let description: string;
  export let author_username: string;
  export let creation_date: Date;
  export let deletable: boolean;
</script>

<!-- https://stackoverflow.com/a/19834283 -->
<div
  class="inline-block group w-full mb-6 secondary-container hover:bg-[var(--md-sys-color-tertiary-container)] transition-all rounded-xl p-4 max-w-lg"
>
  <div class="flex">
    <a href={`/blog/${id}`}>
      <div
        class="display-small line-clamp-2 on-secondary-container-text font-bold mb-2"
      >
        {title}
      </div>
    </a>
    {#if deletable}
      <form
        action="?/deleteblog"
        class="invisible group-hover:visible ml-auto flex items-center"
        method="post"
      >
        <input type="hidden" name="blog_id" value={id} />
        <button
          type="submit"
          class="bg-[var(--md-sys-color-surface-tint)] w-full p-1
            rounded-full material-symbols-outlined"
        >
          delete
        </button>
      </form>
    {/if}
  </div>
  <a class="block w-fit" href={`/user/${author_username}`}>
    <div class="label-large on-secondary-container-text font-bold mb-2">
      - by {author_username}
    </div>
    <div class="label-large on-secondary-container-text font-bold">
      - on {creation_date.toLocaleString()}
    </div>
  </a>
  <a href={`/blog/${id}`}>
    <div
      class="border-0 my-2 border-b border-solid border-b-[var(--md-sys-color-on-secondary-container)]"
    />
    <div class="body-large on-secondary-container-text mt-2 line-clamp-4">
      {description}
    </div>
  </a>
</div>
