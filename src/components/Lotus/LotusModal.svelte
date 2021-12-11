<script>
  export let showModal
  export let lotusObj

  let txHash
  let txHashLink
  let showTxModal = false

  import {
    LotusContract,
    signer,
    myAddress,
    myLotusList,
    CNDV2Contract,
    myCNDV2Balance,
    myCNDV2List,
    NectarContract,
    myNectarBalance,
    lotusLoading,
    walletLoading
  } from '@/stores'
  import { ethers } from 'ethers'
  import LotusABI from '@/data/abi/LotusStaking.json'
  import CNDV2Abi from '@/data/abi/ClonesNeverDieV2.json'
  import NectarAbi from '@/data/abi/Nectar.json'

  import TxModal from '@/components/TxModal/index.svelte'

  async function nectarMine(lotusId) {
    const contract = await new ethers.Contract($LotusContract, LotusABI, $signer)
    const transaction = await contract.mine(lotusId)
    openModal()
    await transaction.wait().then(data => {
      txHash = data.transactionHash
      txHashLink = `https://polygonscan.com/tx/${txHash}`
    })
  }

  async function outLotus(lotusId) {
    const contract = await new ethers.Contract($LotusContract, LotusABI, $signer)
    const transaction = await contract.outLotus(lotusId)
    openModal()
    await transaction.wait().then(data => {
      txHash = data.transactionHash
      txHashLink = `https://polygonscan.com/tx/${txHash}`
    })
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
    $lotusLoading = true
  }

  async function getCNDV2Balance() {
    let _myCNDV2List = []
    const contract = await new ethers.Contract($CNDV2Contract, CNDV2Abi, $signer)
    let _myCNDV2Balance = await contract.balanceOf($myAddress)
    for (let i = 0; i < _myCNDV2Balance; i++) {
      let tokenId = await contract.tokenOfOwnerByIndex($myAddress, i)
      _myCNDV2List.push(tokenId)
    }
    $myCNDV2Balance = _myCNDV2Balance
    $myCNDV2List = _myCNDV2List
    $walletLoading = true
  }

  async function getNectarBalance() {
    const contract = await new ethers.Contract($NectarContract, NectarAbi, $signer)
    let _myNectarBalance = await contract.balanceOf($myAddress)
    $myNectarBalance = _myNectarBalance / 1e18
  }

  function openModal() {
    showTxModal = !showTxModal
  }

  function closeModal() {
    showModal = !showModal
  }

  function loadingFalse() {
    $lotusLoading = false
    $walletLoading = false
  }

  async function setModal() {
    loadingFalse()
    openModal()
    closeModal()
    await getNectarBalance()
    await getCNDV2Balance()
    await getMyActivedLotusList()
    txHash = null
    txHashLink = null
  }
</script>

{#if showModal}
  <div class="modal">
    <div class="modal_body">
      <div class="btn-wrap">
        <div class="closeBtn" on:click>Close</div>
      </div>
      <div class="sub-title"><b>My Lotus Info</b></div>
      <div class="state">
        <div class="state-item">Lotus ID: {lotusObj.myLotusId}</div>
        <div class="state-item">Potential Nectar: {lotusObj.PotentialNectar}</div>
        <div class="state-item">
          My Clones ID: <div class="item-list">
            {lotusObj.clonesList}
          </div>
        </div>
      </div>
      <div class="btn-list">
        <div class="btn" on:click="{nectarMine(lotusObj.myRealLotusList)}"><b>Nectar Mine</b></div>
        <div class="btn" on:click="{outLotus(lotusObj.myRealLotusList)}"><b>Export Clones</b></div>
      </div>
    </div>
  </div>
  <TxModal showModal="{showTxModal}" txHash="{txHash}" txHashLink="{txHashLink}" on:click="{setModal}" />
{/if}

<style lang="scss">
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .state {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 5px;
  }

  .state-item {
    margin-bottom: 50px;
  }

  .item-list {
    margin-bottom: 50px;
    width: 90%;
    margin: 10px;
    overflow: scroll;
    word-wrap: break-word;
    height: 100px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .item-list::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .modal_body {
    border: 10px solid black;
    padding: 10px;
    border-radius: 20px;
    max-width: 400px;
    height: 450px;
    margin: 10% auto;
    text-align: center;
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sub-title {
    font-size: 1.4rem;
  }

  .btn {
    width: 50%;
    height: auto;
    background-color: $highlight-color;
    color: white;
    padding: 10px;
    font-size: 1.2rem;
    box-sizing: border-box;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
  }

  .btn:active {
    opacity: 0.7;
  }

  .btn-list {
    display: flex;
  }

  .btn-wrap {
    display: flex;
    justify-content: right;
  }
  .closeBtn {
    width: 50px;
    height: 20px;
    color: $highlight-color;
    cursor: pointer;
  }
</style>
