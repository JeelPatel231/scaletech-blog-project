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
      <span class="display-large mb-8 text-center">Register</span>

      <M3Input label="First Name" name="first_name" type="text" />
      <span class="error-text label-small ml-2">{form?.first_name ?? ""}</span>

      <M3Input label="Last Name" name="last_name" type="text" />
      <span class="error-text label-small ml-2">{form?.last_name ?? ""}</span>

      <M3Input label="Username" name="username" type="text" />
      <span class="error-text label-small ml-2">{form?.username ?? ""}</span>

      <M3Input label="Password" name="password" type="password" />
      <span class="error-text label-small ml-2">{form?.password ?? ""}</span>

      <M3Input
        label="Confirm Password"
        name="passwordConfirm"
        type="password"
      />
      <span class="error-text label-small ml-2">
        {form?.passwordConfirm ?? ""}
      </span>
      <!---->
      <input type="file" accept="image/*" name="avatar" />
      <span class="error-text label-small ml-2">{form?.avatar ?? ""}</span>
      <!---->
      <span class="h-4" />
      <Mat3Button type="submit">Submit</Mat3Button>

      <span class="text-center mt-4"
        >Already have an account? <a
          class="on-background-text underline"
          href="/login">Login Here</a
        ></span
      >
    </form>
  </div>
</div>
