<script>
  import TxModal from '@/components/TxModal/index.svelte'
  import {
    myCNDV2List,
    LotusContract,
    signer,
    CNDV2Contract,
    myAddress,
    myCNDV2Balance,
    myLotusList,
    walletLoading
  } from '@/stores'
  import { ethers } from 'ethers'
  import { RingLoader } from 'svelte-loading-spinners'
  import LotusABI from '@/data/abi/LotusStaking.json'
  import CNDV2ABI from '@/data/abi/ClonesNeverDieV2.json'

  let showModal = false
  let txHash
  let txHashLink
  let checkedIds = []

  async function goLotus() {
    const contract = await new ethers.Contract($LotusContract, LotusABI, $signer)
    const transaction = await contract.goLotus(checkedIds)
    openModal()
    await transaction.wait().then(data => {
      txHash = data.transactionHash
    })
    checkedIds = []
    txHashLink = `https://polygonscan.com/tx/${txHash}`
  }

  function cheked(num) {
    if (checkedIds.includes(num)) {
      let filteredId = checkedIds.filter(ids => {
        return ids !== num
      })
      checkedIds = filteredId
    } else {
      if (checkedIds.length === 100) {
        alert('There are 100 clones that can be steaked at once.')
        return false
      }
      checkedIds.push(num)
      checkedIds = checkedIds
    }
  }

  async function getCNDV2Balance() {
    $walletLoading = false
    let _myCNDV2List = []
    const contract = await new ethers.Contract($CNDV2Contract, CNDV2ABI, $signer)
    let _myCNDV2Balance = await contract.balanceOf($myAddress)
    for (let i = 0; i < _myCNDV2Balance; i++) {
      let tokenId = await contract.tokenOfOwnerByIndex($myAddress, i)
      _myCNDV2List.push(tokenId)
    }
    $myCNDV2Balance = _myCNDV2Balance
    $myCNDV2List = _myCNDV2List
    $walletLoading = true
  }

  async function getMyActivedLotusList() {
    const contract = await new ethers.Contract($LotusContract, LotusABI, $signer)
    let _myLotusList = await contract.myLotusList($myAddress)
    let _myRealLotusList = []
    for (let i = 0; i < _myLotusList.length; i++) {
      let _myClonesListInLotus = []
      let _lotuses = await contract.lotuses(_myLotusList[i])
      let _lotusV2TokenIds = await contract.getLotusV2TokenId(_myLotusList[i])
      let _potentialNectar = await contract.subsidyOf(_myLotusList[i])
      if (_lotuses.owner !== '0x0000000000000000000000000000000000000000') {
        for (let j = 0; j < _lotusV2TokenIds.length; j++) {
          _myClonesListInLotus.push(parseInt(_lotusV2TokenIds[j]))
        }
        _myRealLotusList.push({
          myRealLotusList: i,
          myLotusId: parseInt(_myLotusList[i]._hex),
          power: parseInt(_lotuses.power),
          PotentialNectar: Math.floor(_potentialNectar / 1e18),
          clonesList: _myClonesListInLotus
        })
      }
    }
    $myLotusList = _myRealLotusList
  }

  function openModal() {
    showModal = !showModal
  }

  async function setModal() {
    openModal()
    await getCNDV2Balance()
    await getMyActivedLotusList()
    txHash = null
    txHashLink = null
  }
</script>

<div class="sub-content">
  <div class="sub-title"><b>Lotus Staking</b></div>
  <div class="sub-item">
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Staking</b></div>
      <div class="sub-item-explain">Send clones to Lotus. Please select a clone to stake and press the button.</div>
      <div class="sub-item-title"><b>My Clones</b></div>
      <ul class="sub-item-list-head">
        <li class="list-item">
          <div class="item-number">Select</div>
          <div class="item-number">No.</div>
          <div class="item-name">Clone Name</div>
          <div class="item-id">Clone ID</div>
        </li>
      </ul>
      <ul class="sub-item-list">
        {#each $myCNDV2List as item, index}
          <li class="list-item">
            {#if checkedIds.includes(parseInt(item._hex)) === true}
              <div class="checked" value="{parseInt(item._hex)}" on:click="{() => cheked(parseInt(item._hex))}"></div>
            {:else}
              <div class="check" value="{parseInt(item._hex)}" on:click="{() => cheked(parseInt(item._hex))}"></div>
            {/if}
            <div class="item-number">{index + 1}</div>
            <div class="item-name">CxNxD 萬 #{item}</div>
            <div class="item-id">{item}</div>
          </li>
        {/each}
        {#if $walletLoading === false}
          <div class="loading">
            <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
          </div>
        {/if}
      </ul>

      <!-- <div class="sub-selected">Selected ID: {checkedIds}</div> -->
      <div class="sub-selected">Selected clones: {checkedIds.length}</div>
      {#if checkedIds.length === 0}
        <div class="sub-btn-non"><b>Staking</b></div>
      {:else}
        <div class="sub-btn" on:click="{goLotus}"><b>Staking</b></div>
      {/if}
    </div>
  </div>
</div>

<TxModal showModal="{showModal}" txHash="{txHash}" txHashLink="{txHashLink}" on:click="{setModal}" />

<style lang="scss">
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
  .sub-btn-non {
    width: 100%;
    background-color: lightgray;
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

  .sub-title {
    color: $highlight-color;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .sub-item {
    border: 2px solid $highlight-color;
    height: auto;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .sub-item-wrap {
    padding: 30px;
    display: flex;
    height: 80%;
    flex-direction: column;
    justify-content: space-around;
  }

  .sub-item-title {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .sub-item-explain {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .sub-item-list {
    padding: 10px;
    height: 200px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .sub-item-list::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .sub-item-list-head {
    box-sizing: border-box;
    border-radius: 10px;
  }

  .list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  .sub-btn {
    width: 100%;
    background-color: $highlight-color;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .sub-selected {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 768px) {
    .sub-item-wrap {
      padding: 15px;
    }
    .list-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 0.7rem;
    }
  }
</style>
