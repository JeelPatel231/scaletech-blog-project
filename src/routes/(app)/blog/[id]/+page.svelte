<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div class="display-large mb-4">
  {data.blog.title}
</div>
<div class="headline-medium mb-8">
  - by {data.blog.author_username}
</div>
<div class="body-large mb-8">
  {data.blog.description}
</div>
<div class="markdown-container">
  {@html data.htmlRender}
</div>
