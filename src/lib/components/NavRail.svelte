<script lang="ts">
  import AccountCircle from "$lib/assets/AccountCircle.svelte";
  import STxyz from "$lib/assets/STxyz.svelte";
  import type { User } from "$lib/typeORM/User";
  import NavRailAnchor from "./NavRailAnchor.svelte";
  import PrimaryNavButton from "./PrimaryNavButton.svelte";
  export let user: User;
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
  <div
    class="flex sm:flex-col gap-4 h-full sm:h-auto ml-auto sm:ml-0 sm:mt-auto sm:mb-4"
  >
    {#if user}
      <div class="flex flex-col items-center mb-2">
        {#if user.avatar}
          <img
            src={`/avatar/${user.username}.png`}
            class="rounded-full w-full h-full object-cover aspect-square"
            alt={user.username}
          />
        {:else}
          <AccountCircle class="fill-[var(--md-sys-color-on-background)]" />
        {/if}
      </div>
      <!-- <div class="label-large mb-4"> -->
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
