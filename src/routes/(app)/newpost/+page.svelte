<script lang="ts">
  import M3Input from "$lib/components/M3Input.svelte";
  import M3TextArea from "$lib/components/M3TextArea.svelte";
  import Mat3Button from "$lib/components/Mat3Button.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div class="display-large">New Blog Post</div>
<form method="post" class="max-w-3xl">
  <M3Input type="text" label="Title" name="title" />
  <M3Input type="text" label="Description" name="description" />
  <M3TextArea label="Content" name="content" expandable={true} />
  <Mat3Button type="submit">Post Blog</Mat3Button>
</form>
<!--  ADD TAGS CHIPS -->

{#if form?.fieldErrors}
  {JSON.stringify(form)}
{/if}
