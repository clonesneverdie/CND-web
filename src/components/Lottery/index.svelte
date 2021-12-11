<script>
  import LotteryBox from './LotteryBox.svelte'
  import SaleGraph from './SaleGraph.svelte'
</script>

<div class="container">
  <div class="container-title">CxNxD Asset Lottery</div>
  <div class="container-paragraph">
    You can draw assets for Clones Never Die. This asset is used for V3 Clone customization.
    <br />
    There are two transactions to receive the NFT. One is for permission to use tokens, and the other is for using tokens.
  </div>
  <br />
  <div class="container-content">
    <div class="mintbox">
      <LotteryBox />
    </div>
    <div class="mintbox">
      <SaleGraph />
    </div>
    <a class="collection" href="https://opensea.io/collection/clones-never-die-asset" target="_blank"
      >Going to OpenSea CxNxD Asset collection</a
    >
  </div>
</div>

<hr class="divide-line" />

<style lang="scss">
  .container {
    flex-direction: column;
  }
  .container-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .collection {
    font-size: 1rem;
    color: $highlight-color;
  }
  .mintbox {
    width: 55%;
    height: auto;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    .mintbox {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: auto;
    }
  }
</style>
