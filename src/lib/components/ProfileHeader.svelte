<script lang="ts">
  export let avatar: boolean;
  export let username: string;
  export let first_name: string;
  export let last_name: string;
</script>

<div class="flex flex-col sm:flex-row gap-8 items-center">
  {#if avatar}
    <img
      class="aspect-square w-full max-w-xs sm:w-40 rounded-full object-cover"
      src={`/avatar/${username}.png`}
      alt={username}
    />
  {/if}
  <span>
    <div class="display-large mb-2 !underline underline-offset-8">
      {first_name}
      {last_name}
    </div>
    <div class="display-medium mb-8">
      - @{username}
    </div>
  </span>
</div>
