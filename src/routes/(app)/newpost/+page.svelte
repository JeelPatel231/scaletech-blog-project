<script lang="ts">
  import M3Input from "$lib/components/M3Input.svelte";
  import M3TextArea from "$lib/components/M3TextArea.svelte";
  import Mat3Button from "$lib/components/Mat3Button.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div class="display-large">New Blog Post</div>
<form method="post" class="max-w-3xl">
  <M3Input label="Title" name="title" value={form?.data.title ?? ""} />
  <span class="error-text label-small">{form?.errors.title ?? ""}</span>
  <M3Input
    label="Description"
    name="description"
    value={form?.data.description ?? ""}
  />
  <span class="error-text label-small">{form?.errors.description ?? ""}</span>
  <M3Input
    label="Tags"
    name="tags"
    note="A tag must be of only 1 word, multiple tags are seperated by spaces."
    value={form?.data.tags ?? ""}
  />
  <span class="error-text label-small">{form?.errors.tags ?? ""}</span>
  <M3TextArea
    label="Content"
    name="content"
    expandable={true}
    value={form?.data.content ?? ""}
  />
  <span class="block error-text label-small mb-4"
    >{form?.errors.content ?? ""}</span
  >
  <Mat3Button type="submit">Post Blog</Mat3Button>
</form>
