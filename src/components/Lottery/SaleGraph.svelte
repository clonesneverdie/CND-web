<script lang="ts">
  import { AssetLotteryContract, publicPolygonRPC, saleCount } from '@/stores'
  import { onMount } from 'svelte'
  import { ethers } from 'ethers'
  import AssetsLotteryABI from '@/data/abi/AssetsLotteryV1.json'

  const provider = new ethers.providers.JsonRpcProvider($publicPolygonRPC)

  let percent: any = 0
  let percentWidth: any = `width: ${percent}%;`
  $: percentWidth = `width: ${percent}%;`

  $: percent = Math.ceil(($saleCount / 300) * 100)
  onMount(() => {
    getSaleCount()
  })

  async function getSaleCount() {
    const contract = new ethers.Contract($AssetLotteryContract, AssetsLotteryABI, provider)
    console.log(parseInt(await contract.currentSaleCount()));
    $saleCount = parseInt(await contract.currentSaleCount())
    percent = Math.ceil(($saleCount / 300) * 100)
  }
</script>

<div class="subtitle">
  <b>Sale progress</b>
</div>

<div class="progressbar">
  <div class="in-progressbar" style="{percentWidth}">{percent}%</div>
</div>
<div class="amount">{$saleCount} / 300 Assets</div>

<style lang="scss">
  .progressbar {
    background-color: lightgray;
    width: 100%;
    border-radius: 13px;
    margin-bottom: 10px;
  }

  .in-progressbar {
    background-color: $highlight-color;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    /* padding: 3px; */
    font-size: 20px;
    padding: 3px 0px;
  }

  .amount {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>
