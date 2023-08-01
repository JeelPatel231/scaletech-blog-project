<script lang="ts">
  import BlogCard from "$lib/components/BlogCard.svelte";
  import M3InputPass from "$lib/components/M3InputPass.svelte";
  import Mat3Button from "$lib/components/Mat3Button.svelte";
  import ProfileHeader from "$lib/components/ProfileHeader.svelte";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  export let form: ActionData;
</script>

<svelte:head>
  <title>Blog | Manage Your Account</title>
</svelte:head>

<ProfileHeader {...data.userData} />

<span class="block h-8" />
<div class="display-small mb-4 !underline underline-offset-8">
  Account Details
</div>
<div class="body-large">
  Creation Date : {data.userData.account_created}
</div>

<span class="block h-10" />
<!-- change password -->
<div class="display-small mb-4 !underline underline-offset-8">
  Change Password
</div>
<form method="POST" action="?/changepassword" class="max-w-3xl">
  <M3InputPass label="Password" name="password" value="" />
  <span class="block error-text label-small ml-2">
    {form?.errors?.password ?? ""}
  </span>

  <M3InputPass label="Confirm Password" name="passwordConfirm" value="" />
  <span class="block error-text label-small ml-2">
    {form?.errors?.passwordConfirm ?? ""}
  </span>
  {#if form?.success}
    <span class="block body-large ml-2"> Password Changed Successfully! </span>
  {/if}
  <span class="block h-4" />
  <Mat3Button type="submit">Change Password</Mat3Button>
</form>

<span class="block h-8" />
<div class="display-small mb-4 !underline underline-offset-8">
  Blogs written by you
</div>
{#if data.userData.blogs.length === 0}
  <div class="body-large">No Blogs Posted Yet!</div>
{/if}
<div class="columns-1 gap-8 md:columns-2 lg:columns-3 max-w-7xl">
  <!-- Deletable should be true in this page but still precaution -->
  {#each data.userData.blogs as blog}
    <BlogCard
      author_username={data.userData.username}
      deletable={data.userData.username === data.loggedInUser?.username}
      {...blog}
    />
  {/each}
</div>
