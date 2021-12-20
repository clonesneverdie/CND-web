<script>
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import { onMount } from 'svelte'
  import { isConnect, WhiteholeContract, signer, myAddress, myPaxBalance, myPaxsetBalance, PaxContract } from '@/stores'
  import PaxABI from '@/data/abi/Pax.json'
  import WhiteholeABI from '@/data/abi/Whitehole.json'
  import { ethers } from 'ethers'

  let stakingValue
  let unstakingValue
  $: $myPaxBalance
  $: $myPaxsetBalance


  onMount(() => {
    window.scrollTo(0, 0)
  })

  function maxPax() {
    stakingValue = $myPaxBalance / 1e18
  }

  function maxPaxset() {
    unstakingValue = $myPaxsetBalance / 1e18
  }

  function setZeroValue() {
    stakingValue = 0
    unstakingValue = 0
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
    const stakingVal = stakingValue * 1e18
    const paxContract = await new ethers.Contract($PaxContract, PaxABI, $signer)
    const approve = await paxContract.approve($WhiteholeContract, stakingVal.toString())
    await approve.wait()
    const whiteholeContract = await new ethers.Contract($WhiteholeContract, WhiteholeABI, $signer)
    const stake = await whiteholeContract.stake(stakingVal.toString())
    await stake.wait()
    getMyPaxBalance()
    getMyPaxsetBalance()
    setZeroValue()
  }

  async function paxsetUnstake() {
    const unstakingVal = unstakingValue * 1e18
    const whiteholeContract = await new ethers.Contract($WhiteholeContract, WhiteholeABI, $signer)
    const unstake = await whiteholeContract.unstake(unstakingVal.toString())
    await unstake.wait()
    getMyPaxBalance()
    getMyPaxsetBalance()
    setZeroValue()
  }
</script>

<div class="container">
  <div class="container-title">White Hole</div>
  <div class="container-content">
    <div class="container-paragraph">
      $PAX is a token used in the CxNxD ecosystem and is used to use the utility provided by CxNxD.
    </div>
    <div class="logo-wrap">
      <img class="logo" src="/assets/paxset.png" alt="pax-logo" />
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
            <div class="box-text">My $PAX: {$myPaxBalance / 1e18}</div>
            <div class="text-btn" on:click="{maxPax}">- Max</div>
          </div>
          <input type="number" bind:value="{stakingValue}" disabled="{!$isConnect}" />
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
            <div class="box-text">My $PAXSET: {$myPaxsetBalance / 1e18}</div>
            <div class="text-btn" on:click="{maxPaxset}">- Max</div>
          </div>
          <input type="number" bind:value="{unstakingValue}" disabled="{!$isConnect}" />
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
    margin-bottom: 30px;
  }

  .logo {
    width: 50%;
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
