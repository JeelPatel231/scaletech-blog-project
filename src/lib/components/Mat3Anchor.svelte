<script lang="ts">
  export let href: string;
  export let materialColor: string = "primary";
</script>

<a
  class={`${materialColor} flex items-center px-4 label-large on-${materialColor}-text h-10 rounded-full ${$$props.class}`}
  {href}
>
  <slot />
</a>
