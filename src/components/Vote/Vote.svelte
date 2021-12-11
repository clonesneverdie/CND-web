<script>
  export let pageId
  import { onMount, beforeUpdate } from 'svelte'
  import { myCNDV2List, VoteContract, signer, walletLoading, isConnect } from '@/stores'
  import { ethers } from 'ethers'
  import { RingLoader } from 'svelte-loading-spinners'
  import PConnect from '@/components/PolygonConnect/index.svelte'
  import CNDVoteABI from '@/data/abi/CNDVote.json'

  let loading = true
  let checkedIds = []
  let exceptVotedClones = []
  const CNDV2CA = '0x6c15030A0055D7350c89EbbD460EB4F145462Fbd'

  $: $myCNDV2List, exceptVoted()

  async function voteFor() {
    const contract = await new ethers.Contract($VoteContract, CNDVoteABI, $signer)
    const transaction = await contract.voteFor(pageId, CNDV2CA, checkedIds)
    await transaction.wait()
    checkedIds = []
  }

  async function voteAgainst() {
    const contract = await new ethers.Contract($VoteContract, CNDVoteABI, $signer)
    const transaction = await contract.voteAgainst(pageId, CNDV2CA, checkedIds)
    await transaction.wait()
    checkedIds = []
  }

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

  async function cloneVoted(num) {
    const contract = new ethers.Contract($VoteContract, CNDVoteABI, $signer)
    const isVoted = await contract.cloneVoted(pageId, CNDV2CA, num)
    return isVoted
  }

  async function exceptVoted() {
    loading = false
    let data = []
    for (let i = 0; i < $myCNDV2List.length; i++) {
      if ((await cloneVoted(parseInt($myCNDV2List[i]._hex))) === false) {
        data = [...data, parseInt($myCNDV2List[i]._hex)]
      }
    }
    exceptVotedClones = data
    console.log(exceptVotedClones)
    loading = true
  }

  function selectAll() {
    checkedIds = exceptVotedClones
  }

  function selectNone() {
    let data = []
    checkedIds = data
  }
</script>

<div class="container">
  <div class="container-content">
    <div class="vote-wrap">
      <div class="vote-content-box">
        <div class="vote-content">
          <div class="text-btn" on:click="{selectAll}">-Select All</div>
          <div class="text-btn" on:click="{selectNone}">-Unselect All</div>
        </div>
        <div class="vote-content">
          <ul class="sub-item-list-head">
            <li class="list-item">
              <div class="item-number">Select</div>
              <div class="item-number">No.</div>
              <div class="item-name">Clone Name</div>
              <div class="item-id">Clone ID</div>
            </li>
          </ul>
          <div class="clone-list-wrap">
            {#each exceptVotedClones as item, index}
              <!-- {#if cloneVoted(parseInt(item._hex)) === true} -->
              <div class="clone-list">
                <!-- {#if cloneVoted(item) === true}
                  <div class="check-end"></div> -->
                {#if checkedIds.includes(item) === true}
                  <div class="checked" value="{item}" on:click="{() => cheked(item)}"></div>
                {:else}
                  <div class="check" value="{item}" on:click="{() => cheked(item)}"></div>
                {/if}
                <div class="item-number">{index + 1}</div>
                <div class="item-name">CxNxD 萬 #{item}</div>
                <div class="item-id">{item}</div>
              </div>
              <!-- {/if} -->
            {/each}
            {#if $walletLoading === false || loading === false}
              <div class="loading">
                <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
              </div>
            {/if}
          </div>
          <div class="sub-content">
            {#if $isConnect}
              <div class="voteBtn" on:click="{voteFor}">
                <b> Agree </b>
              </div>
              <div class="voteBtn" on:click="{voteAgainst}">
                <b> Disagree </b>
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
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .sub-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

  .voteBtn {
    width: 49%;
    background-color: $highlight-color;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .voteBtn:active {
    opacity: 0.7;
  }

  .vote-wrap {
    width: 60%;
  }

  .vote-content-box {
    width: 100%;
    border: 2px solid $highlight-color;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .vote-content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .clone-list-wrap {
    height: 200px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    margin-bottom: 20px;
  }

  .clone-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1rem;
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

  .text-btn {
    color: $highlight-color;
    font-size: 1.1rem;
    margin-bottom: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .vote-wrap {
      width: 100%;
    }
  }
</style>
