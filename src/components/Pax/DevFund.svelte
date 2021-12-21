<script>
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import { onMount } from 'svelte'
  import { ethers } from 'ethers'
  import {
    isConnect,
    myDevTokenBalance,
    myDevFundClaimable,
    myStakedDevToken,
    DevTokenContract,
    DevFundContract,
    signer,
    myAddress
  } from '@/stores'
  import DevFundTokenABI from '@/data/abi/DevFundToken.json'
  import DevFundABI from '@/data/abi/ERC20StakingPool.json'

  let myClaimable = 0
  let myToken = 0
  let myStakedToken = 0

  let stakingValue
  let unstakingValue

  $: if ($myDevFundClaimable > 0) {
    claimablePaxToShort()
  }

  $: if ($myDevTokenBalance > 0) {
    myDevTokenToShort()
  }

  $: if ($myStakedDevToken > 0) {
    myStakedTokenToShort()
  }

  onMount(() => {
    window.scrollTo(0, 0)
  })

  function setZeroValue() {
    stakingValue = 0
    unstakingValue = 0
  }

  function claimablePaxToShort() {
    myClaimable = (+ethers.utils.formatEther($myDevFundClaimable)).toFixed(4)
  }

  function myDevTokenToShort() {
    myToken = (+ethers.utils.formatEther($myDevTokenBalance)).toFixed(4)
  }

  function myStakedTokenToShort() {
    myStakedToken = (+ethers.utils.formatEther($myStakedDevToken)).toFixed(4)
  }

  function maxMyDevToken() {
    stakingValue = ethers.utils.formatEther($myDevTokenBalance)
  }

  function maxStakedDevToken() {
    unstakingValue = ethers.utils.formatEther($myStakedDevToken)
  }

  async function getMyDevFundClaimable() {
    const contract = await new ethers.Contract($DevFundContract, DevFundABI, $signer)
    let _myDevFundClaimable = await contract.claimableOf($myAddress)
    $myDevFundClaimable = _myDevFundClaimable
  }

  async function getMyDevTokenBalance() {
    const contract = await new ethers.Contract($DevTokenContract, DevFundTokenABI, $signer)
    let _myDevTokenBalance = await contract.balanceOf($myAddress)
    $myDevTokenBalance = _myDevTokenBalance
  }

  async function getMyStakedDevToken() {
    const contract = await new ethers.Contract($DevFundContract, DevFundABI, $signer)
    let _myStakedDevToken = await contract.shares($myAddress)
    $myStakedDevToken = _myStakedDevToken
  }

  async function claimDevPax() {
    const contract = await new ethers.Contract($DevFundContract, DevFundABI, $signer)
    const claim = await contract.claim()
    await claim.wait()
  }

  async function devTokenStaking() {
    const stakingVal = ethers.utils.parseEther(stakingValue)
    const devTokenContract = await new ethers.Contract($DevTokenContract, DevFundTokenABI, $signer)
    const approve = await devTokenContract.approve($DevFundContract, stakingVal)
    await approve.wait()
    const devFundContract = await new ethers.Contract($DevFundContract, DevFundABI, $signer)
    const stake = await devFundContract.stake(stakingVal)
    await stake.wait()
    setZeroValue()
  }

  async function devTokenUnstaking() {
    const unstakingVal = ethers.utils.parseEther(unstakingValue)
    const devTokenContract = await new ethers.Contract($DevFundContract, DevFundABI, $signer)
    const unstake = await devTokenContract.unstake(unstakingVal)
    await unstake.wait()
    setZeroValue()
  }
</script>

<div class="container">
  <div class="container-title">Dev Fund</div>
  <div class="container-content">
    <div class="container-paragraph">
      $PAX is a token used in the CxNxD ecosystem and is used to use the utility provided by CxNxD.
    </div>
  </div>
</div>

<div class="container">
  <div class="container-content-wrap">
    <div class="box-wrap">
      <div class="box">
        <div class="box-content">
          <div class="box-title"><b>Claim</b></div>
          <div class="box-text-wrap">
            <div class="box-text">Claimable $PAX: {myClaimable}</div>
          </div>
          {#if $isConnect && $myDevFundClaimable > 0}
            <div class="active-btn" on:click="{claimDevPax}">
              <b>Claim</b>
            </div>
          {:else if $isConnect}
            <div class="unactive-btn">
              <b>Claim</b>
            </div>
          {:else}
            <div class="connectBtn">
              <PConnect />
            </div>
          {/if}
        </div>
      </div>
    </div>
    <div class="box-wrap">
      <div class="box">
        <div class="box-content">
          <div class="box-title"><b>Dev Token Staking</b></div>
          <div class="box-text-wrap">
            <div class="box-text">My Dev Token: {myToken}</div>
            <div class="text-btn" on:click="{maxMyDevToken}">- Max</div>
          </div>
          <input type="number" bind:value="{stakingValue}" disabled="{!$isConnect}" />
          {#if $isConnect && stakingValue > 0}
            <div class="active-btn" on:click="{devTokenStaking}">
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
          <div class="box-title"><b>Dev Token Unstaking</b></div>
          <div class="box-text-wrap">
            <div class="box-text">My Staked Dev Token: {myStakedToken}</div>
            <div class="text-btn" on:click="{maxStakedDevToken}">- Max</div>
          </div>
          <input type="number" bind:value="{unstakingValue}" disabled="{!$isConnect}" />
          {#if $isConnect && unstakingValue > 0}
            <div class="active-btn" on:click="{devTokenUnstaking}">
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
    align-items: center;
  }

  .container-paragraph {
    width: 55%;
    margin-bottom: 30px;
  }

  .container-content-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .box-wrap {
    width: 49%;
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
  }
</style>
