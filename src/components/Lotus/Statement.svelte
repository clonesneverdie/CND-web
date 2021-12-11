<script lang="ts">
  import { ethers } from 'ethers'
  import { LotusContract, publicPolygonRPC } from '@/stores'
  import LotusABI from '@/data/abi/LotusStaking.json'
  import { onMount } from 'svelte'
  import axios from 'axios'

  const provider = new ethers.providers.JsonRpcProvider($publicPolygonRPC)
  let clones: any = '-'
  let totalNectar: any = '-'
  let ownersLength: any = 0
  let clonePerBlockNectars: any = '-'

  let ownersList = []

  onMount(() => {
    // axios.get('https://api.clonesneverdie.com/lotus/owners').then(response => {
    //   ownersLength = response.data.owners
    // })
    getOwners()
    getTotalNectar()
    lotusStatement()
  })

  async function getTotalNectar() {
    let lotusGenesisBlock: number = 19087603
    let currentPolygonBlock: number = await provider.getBlockNumber()
    let _totalNectar = (currentPolygonBlock - lotusGenesisBlock) * 10
    totalNectar = convert(_totalNectar)
  }
  async function getOwners() {
    const contract = new ethers.Contract($LotusContract, LotusABI, provider)
    const lotusCount = await contract.lotusCount()
    for (let i = 1; i < lotusCount; i++) {
      let arr = await contract.lotuses(i)
      if (arr[0] === '0x0000000000000000000000000000000000000000') {
        continue
      }
      if (!ownersList.includes(arr[0])) {
        ownersLength += 1
        ownersList.push(arr[0])
      }
    }
    ownersLength = ownersLength
  }
  async function lotusStatement() {
    const contract = new ethers.Contract($LotusContract, LotusABI, provider)
    const totalPower = await contract.totalPower()
    const perBlockNectars = 10 / totalPower
    clones = totalPower - 1
    clonePerBlockNectars = perBlockNectars.toFixed(5)
  }

  function convert(val: any) {
    // thousands, millions, billions etc..
    const s = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z']
    // dividing the value by 3.
    let sNum = Math.floor(('' + val).length / 3)
    // calculating the precised value.
    let sVal: any = parseFloat((sNum != 0 ? val / Math.pow(1000, sNum) : val).toPrecision(2))
    if (sVal % 1 != 0) {
      sVal = sVal.toFixed(1)
    }
    // appending the letter to precised val.
    return sVal + s[sNum]
  }
</script>

<div class="sub-content">
  <div class="sub-title"><b>Lotus Statement</b></div>
  <div class="sub-item">
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Clones</b></div>
      <div class="sub-item-explain">{clones}</div>
    </div>
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Owners</b></div>
      <div class="sub-item-explain">{ownersLength}</div>
    </div>
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Clone / per block</b></div>
      <div class="sub-item-explain">
        <div class="unit">
          {clonePerBlockNectars}
        </div>
        <div class="unit2">$Nectar</div>
      </div>
    </div>
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Total Nectar</b></div>
      <div class="sub-item-explain">{totalNectar}</div>
    </div>
  </div>
</div>

<style lang="scss">
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
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .sub-item-wrap {
    width: 25%;
    padding: 30px;
    display: flex;
    height: 80%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .sub-item-title {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .sub-item-explain {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .unit {
    display: inline;
    /* font-size: 1rem; */
  }

  .unit2 {
    display: inline;
    font-size: 1rem;
  }

  @media screen and (max-width: 768px) {
    .sub-item-wrap {
      padding: 15px;
    }

    .sub-item {
      border: 2px solid $highlight-color;
      padding: 20px;
      height: auto;
      box-sizing: border-box;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
    }

    .sub-item-wrap {
      width: 50%;
      padding: 0px;
      display: flex;
      height: 80%;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    .unit {
      display: inline;
      font-size: 1.2rem;
    }

    .unit2 {
      display: inline;
      font-size: 1.1rem;
    }
  }
</style>
