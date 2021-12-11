<script lang="ts">
  import {
    isConnect,
    myAddress,
    signer,
    myNectarBalance,
    NectarContract,
    AssetLotteryContract,
    saleCount
  } from '@/stores'
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import TxModal from '@/components/TxModal/index.svelte'
  import NectarAbi from '@/data/abi/Nectar.json'
  import AssetsLotteryV1Abi from '@/data/abi/AssetsLotteryV1.json'
  import { ethers } from 'ethers'
  import { onMount } from 'svelte'
  import { SyncLoader } from 'svelte-loading-spinners'

  const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')

  let myPrize: any = 0

  let showModal: boolean = false
  let txHash: any
  let txHashLink: any
  let progressState: boolean = false
  let checkIsSale: boolean = true
  let lotteryValue: any = 15000
  let lotteryValueString: any = '15000000000000000000000'

  let errMessage: boolean = false
  let successMessage: boolean = false

  $: $myAddress

  // async function lotteryBtn() {
  //   let overrides = {
  //     value: ethers.utils.parseEther(calcPayValue(mintValue))
  //   }
  //   const contract = await new ethers.Contract($CNDV2SaleContract, CNDV2SaleAbi, $signer)
  //   const transaction = await contract.mintClone(mintValue, overrides)
  //   openModal()
  //   await transaction.wait().then((data: any) => {
  //     txHash = data.transactionHash
  //   })
  //   mintValue = null
  //   txHashLink = `https://polygonscan.com/tx/${txHash}`
  //   const ts = await contract.totalSupply()
  //   $CNDV2TotalSupply = ts
  // }

  async function pullUp() {
    successMessage = false
    errMessage = false
    const _nectarContract = await new ethers.Contract($NectarContract, NectarAbi, $signer)
    const nectarTransaction = await _nectarContract.approve($AssetLotteryContract, lotteryValueString)
    progressState = true
    await nectarTransaction.wait()
    const _assetLotteryContract = await new ethers.Contract($AssetLotteryContract, AssetsLotteryV1Abi, $signer)
    const lotteryTransaction = await _assetLotteryContract.pullUp().catch((err: any) => {
      progressState = false
      errMessage = true
      console.log(err)
    })
    await lotteryTransaction
      .wait()
      .then((data: any) => {
        successMessage = true
        console.log(data)
      })
      .catch((err: any) => {
        progressState = false
        errMessage = true
      })
    progressState = false
    await getNectarBalance()
    await getSaleCount()
  }

  async function checkSale() {
    const contract = new ethers.Contract($AssetLotteryContract, AssetsLotteryV1Abi, provider)
    checkIsSale = await contract.isSale()
  }

  async function getNectarBalance() {
    const contract = await new ethers.Contract($NectarContract, NectarAbi, $signer)
    let _myNectarBalance = await contract.balanceOf($myAddress)
    $myNectarBalance = _myNectarBalance / 1e18
  }

  async function getSaleCount() {
    const contract = new ethers.Contract($AssetLotteryContract, AssetsLotteryV1Abi, provider)
    $saleCount = parseInt(await contract.currentSaleCount())
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

{#if true}
  <div class="mintbox">
    <div class="boxcontent">
      <div class="subtitle"><b>Your Address</b></div>
      <input type="text" readonly value="{$myAddress}" disabled="{!$isConnect}" />
      <div class="subcontent">Notice: 1 Assets = 15000 Nectar</div>
      <div class="subcontent">
        Your $Nectar balance: {$myNectarBalance}
      </div>
      {#if progressState}
        <div class="progress-text">Progressing....</div>
        <SyncLoader size="60" color="#FF7F00" unit="px" duration="1s" />
      {/if}
      {#if errMessage}
        <div class="progress-text">Error: An error has occurred. Please try again.</div>
      {/if}
      {#if successMessage}
        <div class="progress-text">Success: The transaction success. Please check the assets at OpenSea!</div>
      {/if}
      {#if $isConnect && $myNectarBalance >= lotteryValue && progressState === false && $saleCount !== 300 && checkIsSale}
        <div class="subbtn" on:click="{pullUp}">
          <b> PULL UP </b>
        </div>
      {:else if $isConnect && $myNectarBalance < lotteryValue && progressState === false || ($isConnect && !checkIsSale) || ($isConnect && $saleCount === 300)}
        <div class="unactive-subbtn">
          <b> PULL UP </b>
        </div>
      {:else if ($isConnect && progressState === true)}
        <div class="unactive-subbtn">
          <b> WAIT </b>
        </div>
      {:else if $isConnect}
        <div class="unactive-subbtn">
          <b> PULL UP </b>
        </div>
      {:else}
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

  .progress-text {
    color: $highlight-color;
    margin-bottom: 10px;
  }
</style>
