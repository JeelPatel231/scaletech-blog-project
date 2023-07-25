<script lang="ts">
  import AccountCircle from "$lib/assets/AccountCircle.svelte";
  export let accept: string;
  export let name: string;
  let inputEl: HTMLInputElement;

  let imageData: string | null = null;

  function changePreview() {
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      imageData = fileReader.result;
    };

    if (inputEl.files && inputEl.files[0]) {
      fileReader.readAsDataURL(inputEl.files[0]);
    }
  }
</script>

<div class="mb-3 mt-4">
  <input
    class="h-0 peer"
    bind:this={inputEl}
    on:change={changePreview}
    type="file"
    {name}
    id={name}
  />
  <label
    for={name}
    class="mb-2 peer-focus-within:outline rounded-xl outline-2 peer-focus-within:outline-[var(--md-sys-color-on-background)] flex items-center justify-center on-background-text cursor-pointer"
  >
    <div class="w-20 h-20 mr-4">
      {#if imageData}
        <img
          src={imageData}
          alt="avatar"
          class="w-full h-full rounded-full object-cover"
        />
      {:else}
        <AccountCircle
          class="w-full h-full fill-[var(--md-sys-color-on-background)]"
        />
      {/if}
    </div>
    Click To Upload Avatar
  </label>
</div>
