<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { ethers } from 'ethers'
  import {
    isConnect,
    myAddress,
    myAddressShort,
    myBalance,
    provider,
    signer,
    NectarContract,
    myNectarBalance,
    CNDV2Contract,
    myCNDV2Balance,
    myCNDV2List,
    LotusContract,
    myLotusList,
    walletLoading,
    lotusLoading,
    PaxContract,
    myPaxBalance,
    WhiteholeContract,
    myPaxsetBalance,
    DevTokenContract,
    DevFundContract,
    myDevFundClaimable,
    myDevTokenBalance,
    myStakedDevToken,
    V2AutoMiningContract,
    myV2TotalClaimable,
    intMyCNDV2List,
    QuickswapLPContract,
    myQLPTokenBalance,
    QuickswapStakingPoolContract,
    myQLPClaimable,
    myStakedQLP
  } from '@/stores'
  import NectarAbi from '@/data/abi/Nectar.json'
  import CNDV2Abi from '@/data/abi/ClonesNeverDieV2.json'
  import LotusABI from '@/data/abi/LotusStaking.json'
  import PaxABI from '@/data/abi/Pax.json'
  import WhiteholeABI from '@/data/abi/Whitehole.json'
  import DevFundTokenABI from '@/data/abi/DevFundToken.json'
  import DevFundABI from '@/data/abi/ERC20StakingPool.json'
  import ClonesV2PoolABI from '@/data/abi/ClonesV2Pool.json'

  const ethereum: any | undefined = (window as any).ethereum
  let decimals = 1e18

  onDestroy(() => {
    if ($isConnect === true) {
      getInfo()
    }
  })

  async function requestAccount() {
    await ethereum.request({ method: 'eth_requestAccounts' })
    $isConnect = true
  }

  async function addChain() {
    // await ethereum.request({
    //   method: 'wallet_addEthereumChain',
    //   params: [
    //     {
    //       chainId: '0x4bd',
    //       chainName: 'Popcateum',
    //       nativeCurrency: {
    //         name: 'Popcat',
    //         symbol: 'POP',
    //         decimals: 18
    //       },
    //       rpcUrls: ['https://dataseed.popcateum.org'],
    //       blockExplorerUrls: ['https://explorer.popcateum.org']
    //     }
    //   ]
    // })
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x89',
          chainName: 'Polygon Mainnet',
          nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18
          },
          rpcUrls: ['https://polygon-rpc.com/'],
          blockExplorerUrls: ['https://polygonscan.com/']
        }
      ]
    })
  }

  async function getInfo() {
    $provider = new ethers.providers.Web3Provider(ethereum)
    $signer = $provider.getSigner()
    loadingFalse()
    await getAddress()
    await getBalance()
    await getMyQLPTokenBalance()
    await getQLPClaimable()
    await getNectarBalance()
    await getCNDV2Balance()
    await getMyPaxBalance()
    await getMyPaxsetBalance()
    await getMyDevTokenBalance()
    await getMyDevFundClaimable()
    await getMyStakedDevToken()
    await getMyStakedQLP()
    await totalV2Claimable()
    await getMyActivedLotusList()
  }

  async function getAddress() {
    $myAddress = await $signer.getAddress()
    $myAddressShort = `${$myAddress.slice(0, 6)}...${$myAddress.slice(-4)}`
  }

  async function getBalance() {
    $myBalance = ethers.utils.formatEther(await $provider.getBalance($myAddress))
  }

  function changed() {
    ethereum.on('accountsChanged', async () => {
      loadingFalse()
      await getAddress()
      await getBalance()
      await getNectarBalance()
      await getMyQLPTokenBalance()
      await getQLPClaimable()
      await getCNDV2Balance()
      await getMyPaxBalance()
      await getMyPaxsetBalance()
      await getMyDevTokenBalance()
      await getMyDevFundClaimable()
      await getMyStakedDevToken()
      await getMyStakedQLP()
      await totalV2Claimable()
      await getMyActivedLotusList()
    })
  }

  async function connect() {
    if (ethereum === undefined) {
      alert('There is no Metamask. Please install Metamask.')
      return false
    }
    await addChain()
    requestAccount()
    changed()
  }

  function loadingFalse() {
    $lotusLoading = false
    $walletLoading = false
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

  async function getNectarBalance() {
    const contract = await new ethers.Contract($NectarContract, NectarAbi, $signer)
    let _myNectarBalance = await contract.balanceOf($myAddress)
    $myNectarBalance = _myNectarBalance / decimals
  }

  async function getCNDV2Balance() {
    let _myCNDV2List = []
    let _intMyCNDV2List = []
    const contract = await new ethers.Contract($CNDV2Contract, CNDV2Abi, $signer)
    let _myCNDV2Balance = await contract.balanceOf($myAddress)
    for (let i = 0; i < _myCNDV2Balance; i++) {
      let tokenId = await contract.tokenOfOwnerByIndex($myAddress, i)
      _myCNDV2List.push(tokenId)
      _intMyCNDV2List.push(parseInt(tokenId._hex))
    }
    $myCNDV2Balance = _myCNDV2Balance
    $myCNDV2List = _myCNDV2List
    $intMyCNDV2List = _intMyCNDV2List

    $walletLoading = true
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

  async function getMyDevTokenBalance() {
    const contract = await new ethers.Contract($DevTokenContract, DevFundTokenABI, $signer)
    let _myDevTokenBalance = await contract.balanceOf($myAddress)
    $myDevTokenBalance = _myDevTokenBalance
  }

  async function getMyDevFundClaimable() {
    const contract = await new ethers.Contract($DevFundContract, DevFundABI, $signer)
    let _myDevFundClaimable = await contract.claimableOf($myAddress)
    $myDevFundClaimable = _myDevFundClaimable
  }

  async function getMyStakedDevToken() {
    const contract = await new ethers.Contract($DevFundContract, DevFundABI, $signer)
    let _myStakedDevToken = await contract.shares($myAddress)
    $myStakedDevToken = _myStakedDevToken
  }

  async function totalV2Claimable() {
    let _totalClaim = 0
    const v2Mining = await new ethers.Contract($V2AutoMiningContract, ClonesV2PoolABI, $signer)
    for (let i = 0; i < $intMyCNDV2List.length; i++) {
      let data = await v2Mining.claimableOf($intMyCNDV2List[i])
      _totalClaim += parseInt(data._hex)
    }
    $myV2TotalClaimable = _totalClaim
  }

  async function getMyQLPTokenBalance() {
    const contract = await new ethers.Contract($QuickswapLPContract, DevFundTokenABI, $signer)
    let _myQLPTokenBalance = await contract.balanceOf($myAddress)
    $myQLPTokenBalance = _myQLPTokenBalance
  }

  async function getQLPClaimable() {
    const contract = await new ethers.Contract($QuickswapStakingPoolContract, DevFundABI, $signer)
    let _myQLPClaimable = await contract.claimableOf($myAddress)
    $myQLPClaimable = _myQLPClaimable
  }

  async function getMyStakedQLP() {
    const contract = await new ethers.Contract($QuickswapStakingPoolContract, DevFundABI, $signer)
    let _myStakedQLP = await contract.shares($myAddress)
    $myStakedQLP = _myStakedQLP
  }
</script>

<div on:click="{connect}">
  <b> Wallet Connect </b>
</div>
