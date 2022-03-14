<script lang="ts">
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import { isConnect, myAddressShort } from '@/stores'
  import NectarBalance from './Nectar.svelte'
  import CNDV2Balance from './CNDV2.svelte'
</script>

<div class="container">
  <div class="container-title">CxNxD Wallet</div>
  <div class="container-content">
    <div class="container-paragraph">
      업데이트 준비중 입니다.
      <br />
    </div>
    <!-- <div class="sub-content">
      {#if $isConnect}
        <div class="connected">
          <b>
            {$myAddressShort}
          </b>
        </div>
      {:else}
        <div class="connectBtn">
          <PConnect />
        </div>
      {/if}
    </div>
    <!-- <div class="sub-content">
      <NectarBalance />
    </div> -->
    <!-- <div class="sub-content">
      <CNDV2Balance />
    </div> -->
  </div>
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    min-height: 30vh;
    justify-content: space-between;
    align-items: flex-start;
    height: 60vh;
  }

  .connected {
    width: 200px;
    background-color: $highlight-color;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
  }
  .connectBtn {
    width: 200px;
    background-color: $highlight-color;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .connectBtn:active {
    opacity: 0.7;
  }

  .container-paragraph {
    width: 60%;
  }
  .sub-content {
    width: 100%;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 768px) {
    .container-paragraph {
      width: 100%;
    }
  }
</style>
