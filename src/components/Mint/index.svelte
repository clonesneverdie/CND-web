<script lang="ts">
  import SaleGraph from './SaleGraph.svelte'
  import MintBox from './MintBox.svelte'
</script>

<div class="container" id="mint">
  <div class="container-title">CxNxD 萬 Mint</div>
  <div class="container-paragraph">
    You can mint 'Clones Never Die 萬'. The mint price of one clone is 45 MATIC. If you don't have MATIC, check <a
      class="link-style"
      href="https://bit.ly/2VBodUj"
      target="_blank">here</a
    >.
  </div>
  <br />
  <div class="container-content">
    <div class="mintbox">
      <MintBox />
    </div>
    <div class="mintbox">
      <SaleGraph />
    </div>
    <a class="collection" href="https://opensea.io/collection/clones-never-die-v2" target="_blank"
      >Going to OpenSea CxNxD 萬 collection</a
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
