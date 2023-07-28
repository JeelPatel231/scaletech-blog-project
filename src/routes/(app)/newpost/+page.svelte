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
  <span class="error-text label-small">{form?.title ?? ""}</span>
  <M3Input type="text" label="Description" name="description" />
  <span class="error-text label-small">{form?.description ?? ""}</span>
  <M3Input
    type="text"
    label="Tags"
    name="tags"
    note="A tag must be of only 1 word, multiple tags are seperated by spaces."
  />
  <span class="error-text label-small">{form?.tags ?? ""}</span>
  <M3TextArea label="Content" name="content" expandable={true} />
  <span class="block error-text label-small mb-4">{form?.content ?? ""}</span>
  <Mat3Button type="submit">Post Blog</Mat3Button>
</form>
