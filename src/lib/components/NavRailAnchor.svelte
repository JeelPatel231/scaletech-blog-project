<script lang="ts">
  export let icon: string;
  export let label: string;
  export let reload: true | "" | "off" | null | undefined = "off";
  export let href: string;
</script>

<a
  {href}
  data-sveltekit-reload={reload}
  class="w-16 flex flex-col justify-center items-center"
>
  <span
    class="text-center material-symbols-outlined on-primary-container-text rounded-full h-8 text-2xl mb-2 primary-container w-16"
  >
    {icon}
  </span>
  <span class="on-surface-text label-large">{label}</span>
</a>
