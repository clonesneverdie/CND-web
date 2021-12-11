<script lang="ts">
  import { isConnect, myAddress, CNDV2SaleContract, signer, CNDV2TotalSupply, myBalance, cost } from '@/stores'
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import TxModal from '@/components/TxModal/index.svelte'
  import CNDV2SaleAbi from '@/data/abi/CNDV2Sale.json'
  import { ethers } from 'ethers'
  import { onMount } from 'svelte'

  const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')

  let mintValue: any
  let payableMatic: any

  let showModal: boolean = false
  let txHash: any
  let txHashLink: any
  let ccost: any
  let checkIsSale: boolean = true

  $: $myAddress
  $: ccost = mintValue * 45

  function calcPayValue(num: number) {
    const oneValue = 45
    payableMatic = oneValue * num
    return payableMatic.toString()
  }

  async function mintClone() {
    let overrides = {
      value: ethers.utils.parseEther(calcPayValue(mintValue))
    }
    const contract = await new ethers.Contract($CNDV2SaleContract, CNDV2SaleAbi, $signer)
    const transaction = await contract.mintClone(mintValue, overrides)
    openModal()
    await transaction.wait().then((data: any) => {
      txHash = data.transactionHash
    })
    mintValue = null
    txHashLink = `https://polygonscan.com/tx/${txHash}`
    const ts = await contract.totalSupply()
    $CNDV2TotalSupply = ts
  }

  async function checkSale() {
    const contract = new ethers.Contract($CNDV2SaleContract, CNDV2SaleAbi, provider)
    checkIsSale = await contract.isSale()
  }

  function onInputCheck(e: any) {
    if (!/^([1-9]{1}|1[0-9]{1}|20)$/.test(e.target.value)) {
      e.target.value = ''
      mintValue = null
    }
  }

  function openModal() {
    showModal = !showModal
  }

  function setModal() {
    openModal()
    txHash = null
    txHashLink = null
  }

  onMount(() => {
    checkSale()
  })
</script>

{#if checkIsSale}
  <div class="mintbox">
    <div class="boxcontent">
      <div class="subtitle"><b>Your Address</b></div>
      <input type="text" readonly value="{$myAddress}" disabled="{!$isConnect}" />
      <div class="subtitle"><b>Number of mint limit (1-20)</b></div>
      <input type="number" readonly bind:value="{mintValue}" disabled="{!$isConnect}" on:input="{onInputCheck}" />
      <div class="subcontent">Notice: 1 Clone = 45 MATIC</div>
      <div class="subcontent">
        Your MATIC balance: {$myBalance}
      </div>
      {#if $isConnect && mintValue && $myBalance > ccost}
        <div class="subcontent">
          Cost: {ccost}
        </div>
        <div class="subbtn" on:click="{mintClone}">
          <b> MINT </b>
        </div>
      {:else if $isConnect && $myBalance < ccost}
        <div class="subcontent">Cost: {ccost}</div>
        <div class="unactive-subbtn">
          <b> MINT </b>
        </div>
      {:else if $isConnect}
        <div class="subcontent">Cost: 0</div>
        <div class="unactive-subbtn">
          <b> MINT </b>
        </div>
      {:else}
        <div class="subcontent">Cost: 0</div>
        <div class="subbtn">
          <PConnect />
        </div>
      {/if}
    </div>
  </div>

  <TxModal showModal="{showModal}" txHash="{txHash}" txHashLink="{txHashLink}" on:click="{setModal}" />
{:else}
  <div class="prepare">
    <div class="title">Coming Soon</div>
    <div class="content"><b>Mint Open</b></div>
    <div class="content2"><b>September 13th, 21:00 (GMT+9)</b></div>
  </div>
{/if}

<style lang="scss">
  .prepare {
    width: 100%;
    text-align: center;
    .title {
      color: $highlight-color;
      font-size: 3rem;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .content {
      font-size: 1rem;
      margin-bottom: 40px;
    }
    .content2 {
      font-size: 1rem;
      margin-bottom: 140px;
    }
  }
  .mintbox {
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid $highlight-color;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .boxcontent {
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .subcontent {
    width: 100%;
    font-size: 16px;
    margin-bottom: 25px;
  }

  .unactive-subbtn {
    width: 100%;
    background-color: lightgray;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
  }
  .subbtn {
    width: 100%;
    background-color: $highlight-color;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .subbtn:active {
    opacity: 0.7;
  }

  input {
    width: 100%;
    height: 40px;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 30px;
    display: flex;
    box-sizing: border-box;
  }
</style>
