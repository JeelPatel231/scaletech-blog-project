<script lang="ts">
  import FormPost from "./FormPost.svelte";
  import Mat3Anchor from "./Mat3Anchor.svelte";

  export let id: string;
  export let title: string;
  export let description: string;
  export let author_username: string;
  export let creation_date: Date;
  export let owner: boolean;
  export let form_next: string | undefined;
</script>

<!-- https://stackoverflow.com/a/19834283 -->
<div
  class="inline-block relative group w-full mb-6 secondary-container hover:bg-[var(--md-sys-color-tertiary-container)] transition-all rounded-xl p-4 max-w-lg"
>
  <div class="flex">
    <a href={`/blog/${id}`}>
      <div
        class="display-small line-clamp-2 on-secondary-container-text font-bold mb-2"
      >
        {title}
      </div>
    </a>
    {#if owner}
      <div
        class="flex gap-1 invisible right-1 top-1 group-hover:visible absolute ml-auto items-center"
      >
        <Mat3Anchor href={`/editpost/${id}`}>
          <span class="material-symbols-outlined"> edit </span>
        </Mat3Anchor>
        <FormPost
          action={`/api/deleteblog/${id}${
            form_next ? `?next=${form_next}` : ""
          }`}
        >
          <span class="material-symbols-outlined"> delete </span>
        </FormPost>
      </div>
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
