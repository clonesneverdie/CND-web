<script lang="ts">
  import { CNDV2TotalSupply, CNDV2Contract, publicPolygonRPC } from '@/stores'
  import { onMount } from 'svelte'
  import { ethers } from 'ethers'
  import CNDV2abi from '@/data/abi/ClonesNeverDieV2.json'

  // const provider = new ethers.providers.JsonRpcProvider('https://dataseed.popcateum.org')
  const provider = new ethers.providers.JsonRpcProvider($publicPolygonRPC)

  let percent: any
  let percentWidth: any = `width: ${percent}%;`
  $: percentWidth = `width: ${percent}%;`

  $: percent = $CNDV2TotalSupply / 100
  onMount(() => {
    getTotalSupply()
  })

  async function getTotalSupply() {
    const contract = new ethers.Contract($CNDV2Contract, CNDV2abi, provider)
    $CNDV2TotalSupply = parseInt(await contract.totalSupply())
    percent = $CNDV2TotalSupply / 100
  }
</script>

<div class="subtitle">
  <b>Mint progress</b>
</div>

<div class="progressbar">
  <div class="in-progressbar" style="{percentWidth}">{percent}%</div>
</div>
<div class="amount">{$CNDV2TotalSupply} / 10000 Clones</div>

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
