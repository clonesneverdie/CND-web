<script lang="ts">
  export let image: string
  export let name: string
  export let description: string
  export let link: any
</script>

<div class="pool-box" on:click="{link}">
  <div class="pool-img-wrap">
    <img class="pool-img" src="{image}" alt="pool-list-img" />
  </div>
  <div class="pool-title">{name}</div>
  <div class="pool-description">
    {description}
  </div>
</div>

<style lang="scss">
  .pool-box {
    width: 100%;
    min-height: 310px;
    box-sizing: border-box;
    border: 1px solid $highlight-color;
    border-radius: 10px;
    cursor: pointer;
  }

  .pool-img-wrap {
    width: 100%;
  }

  .pool-img {
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    margin-bottom: 10px;
  }

  .pool-title {
    padding: 10px;
    color: $highlight-color;
    font-size: 1.4rem;
  }

  .pool-description {
    padding: 10px;
    font-size: 1rem;
    line-height: 20px;
  }
</style>
