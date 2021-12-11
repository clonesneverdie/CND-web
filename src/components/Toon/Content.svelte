<script lang="ts">
  import { onMount } from 'svelte'
  import { location } from 'svelte-spa-router'

  interface Toon {
    ToonImage: string
  }

  let imgSrc: Array<Toon> = []
  let pageId: number
  let toonLength = [0, 30]

  onMount(() => {
    getPageId()
    imgSrcGen()
  })

  async function getPageId() {
    pageId = parseInt($location.slice(8))
  }

  function imgSrcGen() {
    let data: Array<Toon> = []
    for (let i = 0; i < toonLength[pageId]; i++) {
      data = [...data, { ToonImage: `/assets/toon${pageId}/${i + 1}.png` }]
    }
    imgSrc = data
    console.log(imgSrc)
  }
</script>

<div class="container">
  <div class="container-title">Comics</div>
  <div class="container-content">
    <div class="container-paragraph">There is Comics about CxNxD here. Check out about CxNxD!</div>
    <div class="toonTool">
      {#each imgSrc as data}
        <img class="toonImg" src="{data.ToonImage}" alt="img" />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    min-height: 80vh;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .container-paragraph {
    width: 60%;
    margin-bottom: 30px;
  }

  .toonTool {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .toonImg {
    display: flex;
    width: 60%;
  }

  @media screen and (max-width: 768px) {
    .container-paragraph {
      align-items: center;
      width: 100%;
    }

    .toonImg {
      width: 100%;
    }
  }
</style>
