<script lang="ts">
  import Mat3Button from "./Mat3Button.svelte";
  export let action: string;
</script>

<form class={$$props.class} {action} method="POST">
  <Mat3Button type="submit">
    <slot />
  </Mat3Button>
</form>
