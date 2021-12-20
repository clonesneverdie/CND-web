<script>
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import { RingLoader } from 'svelte-loading-spinners'
  import {
    isConnect,
    myCNDV2List,
    walletLoading,
    V2AutoMiningContract,
    signer,
    myV2TotalClaimable,
    PaxContract,
    intMyCNDV2List
  } from '@/stores'
  import { beforeUpdate, onMount } from 'svelte'
  import V2MiningABI from '@/data/abi/ClonesV2Pool.json'
  import PaxABI from '@/data/abi/Pax.json'
  import { ethers } from 'ethers'

  let checkedIds = []
  let loading = true

  onMount(() => {
    window.scrollTo(0, 0)
    setInterval(() => {
      totalV2Claimable()
    }, 3000)
  })

  function cheked(num) {
    if (checkedIds.includes(num)) {
      let filteredId = checkedIds.filter(ids => {
        return ids !== num
      })
      checkedIds = filteredId
    } else {
      checkedIds.push(num)
      checkedIds = checkedIds
    }
  }

  function selectAll() {
    checkedIds = $myCNDV2List
  }

  function selectNone() {
    let data = []
    checkedIds = data
  }

  async function v2Claimable(i) {
    const v2Mining = await new ethers.Contract($V2AutoMiningContract, V2MiningABI, $signer)
    const claimData = await v2Mining.claimableOf(i)
    return parseInt(claimData._hex) / 1e18
  }

  async function v2Claim() {
    const paxContract = await new ethers.Contract($PaxContract, PaxABI, $signer)
    const approve = await paxContract.approve($V2AutoMiningContract, '100000000000000000000')
    await approve.wait()
    const v2Mining = await new ethers.Contract($V2AutoMiningContract, V2MiningABI, $signer)
    const claim = await v2Mining.claim(checkedIds)
    await claim.wait()
    selectNone()
  }

  async function totalV2Claimable() {
    let _totalClaim = 0
    const v2Mining = await new ethers.Contract($V2AutoMiningContract, V2MiningABI, $signer)
    for (let i = 0; i < $intMyCNDV2List.length; i++) {
      let data = await v2Mining.claimableOf($intMyCNDV2List[i])
      _totalClaim += parseInt(data._hex)
    }
    $myV2TotalClaimable = _totalClaim
  }
</script>

<div class="container">
  <div class="container-title">V2 Auto Mining</div>
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
          <div class="total-value">Total Pax: {$myV2TotalClaimable / 1e18} $PAX</div>
          <div class="select-all-btn">
            <div class="text-btn" on:click="{selectAll}">- Select All</div>
            <div class="text-btn" on:click="{selectNone}">- Unselect All</div>
          </div>
          <div class="list-head">
            <div class="item-number">Select</div>
            <div class="item-name">Clone ID</div>
            <div class="item-id">$PAX</div>
          </div>
          <div class="list-content-wrap">
            {#if $walletLoading === false || loading === false}
              <div class="loading">
                <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
              </div>
            {/if}
            {#each $myCNDV2List as item}
              <div class="list-content">
                {#if checkedIds.includes(item) === true}
                  <div class="checked" value="{item}" on:click="{() => cheked(item)}"></div>
                {:else}
                  <div class="check" value="{item}" on:click="{() => cheked(item)}"></div>
                {/if}
                <div class="item-name">#{item}</div>
                <div class="item-id">
                  {#await v2Claimable(item)}
                    0
                  {:then data}
                    {data}
                  {/await}
                </div>
              </div>
            {/each}
          </div>
          {#if $isConnect && checkedIds.length > 0}
            <div class="claim-btn" on:click="{v2Claim}">
              <b>Claim</b>
            </div>
          {:else if $isConnect && checkedIds.length === 0}
            <div class="claim-btn-non">
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
    justify-content: center;
  }

  .box-wrap {
    width: 50%;
  }

  .box {
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid $highlight-color;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .box-content {
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .total-value {
    font-size: 1.8rem;
    width: 100%;
    margin-bottom: 30px;
  }

  .list-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .list-content-wrap {
    height: 300px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    margin-bottom: 20px;
    padding: 10px;
  }

  .list-content-wrap::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .list-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1rem;
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

  .claim-btn {
    width: 100%;
    background-color: $highlight-color;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .claim-btn:active {
    opacity: 0.7;
  }

  .claim-btn-non {
    width: 100%;
    background-color: lightgray;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
  }

  .check {
    width: 15px;
    height: 15px;
    background-color: lightgray;
    cursor: pointer;
  }
  .checked {
    width: 15px;
    height: 15px;
    background-color: $highlight-color;
    cursor: pointer;
  }
  .select-all-btn {
    display: flex;
    margin-bottom: 30px;
  }
  .text-btn {
    color: $highlight-color;
    font-size: 1.1rem;
    margin-right: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .container-paragraph {
      align-items: center;
      width: 100%;
    }

    .box-wrap {
      width: 100%;
    }
  }
</style>
