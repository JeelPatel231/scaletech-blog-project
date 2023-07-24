<script lang="ts">
  import STxyz from "$lib/assets/STxyz.svelte";
  import M3Input from "$lib/components/M3Input.svelte";
  import Mat3Button from "$lib/components/Mat3Button.svelte";
  import type { ActionData } from "./$types";
  export let form: ActionData;
</script>

<div class="flex flex-col sm:flex-row h-screen items-center">
  <div class="flex-1 pt-20 text-center">
    <STxyz class="h-80 fill-[var(--md-sys-color-on-background)]" />
  </div>
  <div class="flex-1">
    <form class="flex flex-col px-4 max-w-sm" method="post">
      <span class="display-large mb-8 text-center">Login</span>
      <M3Input label="Username" name="username" type="text" />
      <span class="error-text label-small ml-2">{form?.username ?? ""}</span>
      <M3Input label="Password" name="password" type="password" />
      <span class="error-text label-small ml-2">{form?.password ?? ""}</span>
      <span class="h-4" />
      <Mat3Button type="submit">Submit</Mat3Button>
      <span class="text-center mt-4"
        >No account? <a class="on-background-text underline" href="/register"
          >Register Here</a
        ></span
      >
    </form>
  </div>
</div>
