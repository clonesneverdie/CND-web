<script lang="ts">
  import { VoteContract, publicPolygonRPC } from '@/stores'
  import { ethers } from 'ethers'
  import Header from './Header.svelte'
  import VoteList from './List.svelte'
  import CNDVoteABI from '@/data/abi/CNDVote.json'
  import { onMount } from 'svelte'

  const provider = new ethers.providers.JsonRpcProvider($publicPolygonRPC)

  interface proposalData {
    id: number
    title: string
  }

  let titleList: Array<proposalData> = []
  $: titleList

  async function getList() {
    const contract = new ethers.Contract($VoteContract, CNDVoteABI, provider)
    const number = await contract.proposalCount()
    const proposalCount = parseInt(number._hex)
    for (let i = 0; i < proposalCount; i++) {
      const proposal = await contract.proposals(i)
      titleList.push({
        id: i,
        title: proposal[1]
      })
      titleList = titleList.reverse()
    }
    console.log(titleList)
  }

  onMount(() => {
    getList()
  })
</script>

<Header />
<div class="container">
  <div class="container-content">
    <div class="vote-wrap">
      {#each titleList as item}
        <VoteList title="{item.title}" pageId="{item.id}" />
      {/each}
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

  .vote-wrap {
    width: 60%;
    height: 60vh;
  }

  @media screen and (max-width: 768px) {
    .vote-wrap {
      width: 100%;
      height: 60vh;
    }
  }
</style>
