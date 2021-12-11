<script lang="ts">
  import Header from './Header.svelte'
  let toonData = [
    {
      toonNum: 1
    }
  ]
</script>

<Header />
<div class="container">
  <div class="container-content">
    <div class="toon-wrap">
      {#each toonData as item}
        <div class="toon-box">
          <a href="/#/comics/{item.toonNum}">
            <img class="toon-img" src="/assets/toon{item.toonNum}/1.png" alt="toon{item.toonNum}" />
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .toon-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .toon-box {
    width: 33.3%;
    padding: 10px;
    box-sizing: border-box;
  }

  .toon-img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .toon-wrap {
      width: 100%;
      /* height: 60vh; */
    }

    .toon-box {
      width: 50%;
      /* margin: 10px; */
      padding: 10px;
      box-sizing: border-box;
    }
  }
</style>
