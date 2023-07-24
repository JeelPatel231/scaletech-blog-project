<script lang="ts">
  import { onMount } from "svelte";

  export let name: string;
  export let label: string;
  export let expandable: boolean = false;
  export let rows: number = 15;

  let tx: HTMLTextAreaElement;

  // https://stackoverflow.com/a/25621277
  const textAreaHeightChanger = () => {
    tx.setAttribute(
      "style",
      "height:" + tx.scrollHeight + "px;overflow-y:hidden;"
    );
    tx.addEventListener(
      "input",
      () => {
        tx.style.height = "auto";
        tx.style.height = tx.scrollHeight + "px";
      },
      false
    );
  };

  onMount(() => {
    if (expandable) textAreaHeightChanger();
  });
</script>

<div class="relative w-full">
  <textarea
    bind:this={tx}
    placeholder={label}
    required
    spellcheck="false"
    class="body-large rounded-md w-full mx-1 my-2 p-1
          outline-none on-background-text background border-2
          placeholder-[var(--md-sys-color-on-background)]
          border-[var(--md-sys-color-outline)]"
    {name}
    {rows}
  />
</div>
