<script lang="ts">
  export let name: string;
  export let label: string;
  export let type: string; //"text" | "password";
  export let note: string | undefined = undefined;
  export let required: boolean = true;
</script>

<div class="relative w-full">
  <input
    {required}
    spellcheck="false"
    class="h-10 rounded-md w-full mx-1 my-2 on-background-text background border-none"
    {type}
    {name}
  />
  <label
    class="body-large ml-2 flex items-center pointer-events-none"
    for={name}>{label}</label
  >
</div>
{#if note}
  <div class="body-small secondary-text ml-2">* {note}</div>
{/if}

<style lang="scss">
  label {
    top: 0;
    height: 100%;
    left: 0.5rem;
    position: absolute;
    transition: 200ms;
  }

  input {
    outline: none;
    border: 2px solid var(--md-sys-color-outline);
    padding-left: 0.5rem;

    &:focus {
      border: 2px solid var(--md-sys-color-primary);
    }

    &:focus + label,
    &:valid + label {
      height: 1rem;
      color: var(--md-sys-color-primary);
      left: 0.5rem;
      font-size: 0.75rem;
      background: var(--md-sys-color-background);
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }
  }
</style>
