<script lang="ts">
  export let type: "button" | "submit" | "reset" | null | undefined;
  export let onClick: () => void = () => {};
  export let materialColor: string = "primary";
</script>

<button
  {type}
  class={`${materialColor} px-4 label-large on-${materialColor}-text h-10 rounded-full`}
  on:click={onClick}
>
  <slot />
</button>
