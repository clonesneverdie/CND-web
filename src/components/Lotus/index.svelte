<script lang="ts">
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import MyStakingList from './MyStakingList.svelte'
  import Statement from './Statement.svelte'
  // import LotusStaking from './LotusStaking.svelte'
  // import AllStakingList from './AllStakingList.svelte'
  import SaleGraph from '@/components/Mint/SaleGraph.svelte'
  import { isConnect, myAddressShort, CNDV2Contract } from '@/stores'
  import { onMount } from 'svelte'
  import { ethers } from 'ethers'
  import CNDV2ABI from '@/data/abi/ClonesNeverDieV2.json'
  const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')

  let totalSupply: number

  onMount(() => {
    window.scrollTo(0, 0);
    getTotalSupply()
  })

  async function getTotalSupply() {
    const contract = new ethers.Contract($CNDV2Contract, CNDV2ABI, provider)
    totalSupply = parseInt(await contract.totalSupply())
  }
</script>

<div class="container">
  <div class="container-title">Lotus</div>
  <div class="container-content">
    <div class="container-paragraph">
      Lotus is the place that generates $Nectar. The Lotus generate 10 $Nectar per block generated by the polygon
      blockchain. Approximately 370,000 $Nectar are generated a day.
      <br />
      Clones from Clones Never Die 萬' can bring $Nectar from the Lotus.
      <br />
      Send the clones to the Lotus and bring $Nectar!
    </div>
    <div class="sub-content">
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

    <div class="sub-big-frame">
      <Statement />
    </div>

    {#if true}
      <!-- <div class="sub-frame">
        <LotusStaking />
      </div> -->
      <div class="sub-frame">
        <MyStakingList />
      </div>
    {:else}
      <div class="sub-frame">
        <div class="prepare">It is activated when the minting progress rate reaches 20%</div>
        <div class="graph">
          <SaleGraph />
        </div>
      </div>
    {/if}

    <!-- <div class="sub-big-frame">
      <AllStakingList />
    </div> -->
  </div>
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    min-height: 80vh;
    justify-content: space-between;
    align-items: flex-start;
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
  .prepare {
    font-size: 2rem;
    color: $highlight-color;
    margin-bottom: 40px;
  }

  .graph {
    margin-bottom: 300px;
  }
  .container-paragraph {
    width: 60%;
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

  .sub-content {
    width: 100%;
    margin-bottom: 40px;
  }

  .sub-frame {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  .sub-big-frame {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    .sub-frame {
      width: 100%;
      padding: 0px;
    }

    .sub-big-frame {
      width: 100%;
      padding: 0px;
    }

    .container-paragraph {
      width: 100%;
    }
  }
</style>
