<script>
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import { onMount } from 'svelte'
  import {
    isConnect,
    WhiteholeContract,
    signer,
    myAddress,
    myPaxBalance,
    myPaxsetBalance,
    PaxContract,
    publicPolygonRPC
  } from '@/stores'
  import PaxABI from '@/data/abi/Pax.json'
  import WhiteholeABI from '@/data/abi/Whitehole.json'
  import { ethers } from 'ethers'

  const provider = new ethers.providers.JsonRpcProvider($publicPolygonRPC)

  let myPaxToken = 0
  let myPaxsetToken = 0
  let currentPaxsetValue = 0
  let totalStakedPax = 0

  let stakingValue
  let unstakingValue

  $: if ($myPaxBalance > 0) {
    myPaxTokenToShort()
  }

  $: if ($myPaxsetBalance > 0) {
    myPaxsetTokenToShort()
  }

  onMount(() => {
    window.scrollTo(0, 0)
    getPaxsetValue()
  })

  function setZeroValue() {
    stakingValue = 0
    unstakingValue = 0
  }

  function maxPax() {
    stakingValue = ethers.utils.formatEther($myPaxBalance)
  }

  function maxPaxset() {
    unstakingValue = ethers.utils.formatEther($myPaxsetBalance)
  }

  function myPaxTokenToShort() {
    myPaxToken = (+ethers.utils.formatEther($myPaxBalance)).toFixed(4)
  }

  function myPaxsetTokenToShort() {
    myPaxsetToken = (+ethers.utils.formatEther($myPaxsetBalance)).toFixed(4)
  }

  async function getMyPaxBalance() {
    const contract = await new ethers.Contract($PaxContract, PaxABI, $signer)
    let _myPaxBalance = await contract.balanceOf($myAddress)
    $myPaxBalance = _myPaxBalance
  }

  async function getMyPaxsetBalance() {
    const contract = await new ethers.Contract($WhiteholeContract, WhiteholeABI, $signer)
    let _myPaxsetBalance = await contract.balanceOf($myAddress)
    $myPaxsetBalance = _myPaxsetBalance
  }

  async function paxWhiteholeStake() {
    const stakingVal = ethers.utils.parseEther(stakingValue)
    const paxContract = new ethers.Contract($PaxContract, PaxABI, $signer)
    const approve = await paxContract.approve($WhiteholeContract, stakingVal)
    await approve.wait()
    const whiteholeContract = await new ethers.Contract($WhiteholeContract, WhiteholeABI, $signer)
    const stake = await whiteholeContract.stake(stakingVal)
    await stake.wait()
    setZeroValue()
  }

  async function paxsetUnstake() {
    const unstakingVal = ethers.utils.parseEther(unstakingValue)
    const whiteholeContract = new ethers.Contract($WhiteholeContract, WhiteholeABI, $signer)
    const unstake = await whiteholeContract.unstake(unstakingVal)
    await unstake.wait()
    setZeroValue()
  }

  async function getPaxsetValue() {
    const whiteholeContract = new ethers.Contract($WhiteholeContract, WhiteholeABI, provider)
    const paxContract = new ethers.Contract($PaxContract, PaxABI, provider)
    const paxsetTotalSupply = await whiteholeContract.totalSupply()
    const whiteholePaxBalance = await paxContract.balanceOf($WhiteholeContract)
    const paxsetTotalSupplyValue = ethers.utils.formatEther(paxsetTotalSupply)
    const whiteholePaxBalanceValue = ethers.utils.formatEther(whiteholePaxBalance)
    totalStakedPax = (whiteholePaxBalanceValue * 1).toFixed(4)
    currentPaxsetValue = (paxsetTotalSupplyValue / whiteholePaxBalanceValue).toFixed(4)
  }
</script>

<div class="container">
  <div class="container-title">White Hole</div>
  <div class="container-content">
    <div class="container-paragraph">
      PAX is a token used in the CxNxD ecosystem and is used to use the utility provided by CxNxD.
    </div>
    <div class="logo-wrap">
      <img class="logo" src="/assets/paxset.png" alt="pax-logo" />
    </div>
    <div class="info-wrap">
      <div class="info-text">
        1 PAX = {currentPaxsetValue} PAXSET
      </div>
      <div class="info-text">
        Total Staking: {totalStakedPax} PAX
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="container-content-wrap">
    <div class="box-wrap">
      <div class="box">
        <div class="box-content">
          <div class="box-title"><b>$PAX Staking</b></div>
          <div class="box-text-wrap">
            <div class="box-text">My $PAX: {myPaxToken}</div>
            <div class="text-btn" on:click="{maxPax}">- Max</div>
          </div>
          <input type="text" bind:value="{stakingValue}" disabled="{!$isConnect}" />
          {#if $isConnect && stakingValue > 0}
            <div class="active-btn" on:click="{paxWhiteholeStake}">
              <b>Staking</b>
            </div>
          {:else if $isConnect}
            <div class="unactive-btn">
              <b>Staking</b>
            </div>
          {:else}
            <div class="connectBtn">
              <PConnect />
            </div>
          {/if}
        </div>
      </div>
      <div class="box">
        <div class="box-content">
          <div class="box-title"><b>$PAX Unstaking</b></div>
          <div class="box-text-wrap">
            <div class="box-text">My $PAXSET: {myPaxsetToken}</div>
            <div class="text-btn" on:click="{maxPaxset}">- Max</div>
          </div>
          <input type="text" bind:value="{unstakingValue}" disabled="{!$isConnect}" />
          {#if $isConnect && unstakingValue > 0}
            <div class="active-btn" on:click="{paxsetUnstake}">
              <b>Unstaking</b>
            </div>
          {:else if $isConnect}
            <div class="unactive-btn">
              <b>Unstaking</b>
            </div>
          {:else}
            <div class="connectBtn">
              <PConnect />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    /* align-items: center; */
    flex-direction: column;
  }

  .container-paragraph {
    width: 55%;
    margin-bottom: 30px;
  }

  .container-content-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .box-wrap {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  .box {
    display: flex;
    width: 100%;
    height: 100%;
    border: 2px solid $highlight-color;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 25px;
  }

  .box-content {
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  }

  .connectBtn {
    width: 100%;
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

  .box-title {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  .box-text {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .box-text-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .text-btn {
    color: $highlight-color;
    font-size: 1.1rem;
    margin-right: 10px;
    cursor: pointer;
  }

  .active-btn {
    width: 100%;
    background-color: $highlight-color;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .active-btn:active {
    opacity: 0.7;
  }

  .unactive-btn {
    width: 100%;
    background-color: lightgray;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
  }

  .logo-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .logo {
    width: 50%;
  }

  .info-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
  }

  .info-text {
    font-size: 1.3rem;
    margin-bottom: 10px;
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

  @media screen and (max-width: 768px) {
    .container-paragraph {
      align-items: center;
      width: 100%;
    }

    .box-wrap {
      width: 100%;
    }

    .container-paragraph {
      width: 100%;
      margin-bottom: 30px;
    }

    .container-content-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .box-wrap {
      width: 100%;
      display: flex;
      /* flex-direction: column; */
    }

    .logo-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }

    .logo {
      width: 100%;
    }
  }
</style>
