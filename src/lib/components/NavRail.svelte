<script lang="ts">
  import type { OutputUser } from "$lib/User";
  import STxyz from "$lib/assets/STxyz.svelte";
  import NavRailAnchor from "./NavRailAnchor.svelte";
  import PrimaryNavButton from "./PrimaryNavButton.svelte";
  export let user: OutputUser;
</script>

<nav
  class="flex sm:flex-col area-navbar items-center
  px-2 py-1 sm:py-0 gap-4
  border-solid border-0
  border-r-0 border-t-2
  sm:border-t-0 sm:border-r-2
  border-[var(--md-sys-color-outline)]"
>
  <!-- MAIN ICON -->
  <a href="/">
    <STxyz class="h-14 my-2 fill-[var(--md-sys-color-on-background)]" />
  </a>
  <!-- PRIMARY BUTTONS -->
  {#if user}
    <PrimaryNavButton href="/newpost" />
  {/if}
  <div class="m-2 flex gap-2 items-center">
    <!-- <NavRailAnchor href="/logout" icon="logout" label="Logout" /> -->
  </div>
  <!-- END BUTTONS -->
  <div class="ml-auto sm:ml-0 sm:mt-auto sm:mb-4">
    {#if user}
      <!-- <div class="label-large"> -->
      <!--   {user.username} -->
      <!-- </div> -->
      <NavRailAnchor href="/logout" icon="logout" label="Logout" />
    {:else}
      <NavRailAnchor href="/login" icon="login" label="Login" />
    {/if}
  </div>
</nav>

<style>
  .area-navbar {
    grid-area: navbar;
  }
</style>
