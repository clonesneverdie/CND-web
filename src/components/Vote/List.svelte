<script lang="ts">
  export let pageId: number
  export let title: string
</script>

<a href="/#/vote/{pageId}">
  <div class="vote-title-box">
    <div class="boxcontent">CIP-{pageId} {title}</div>
  </div>
</a>

<style lang="scss">
  .vote-title-box {
    width: 100%;
    border: 2px solid $highlight-color;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .boxcontent {
    padding: 10px;
    display: flex;
    text-align: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
</style>
