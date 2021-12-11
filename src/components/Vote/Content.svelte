<script>
  import { onMount, beforeUpdate } from 'svelte'
  import { VoteContract, publicPolygonRPC } from '@/stores'
  import { ethers } from 'ethers'
  import { location } from 'svelte-spa-router'
  import SvelteMarkdown from 'svelte-markdown'
  import Header from './Header.svelte'
  import CNDVoteABI from '@/data/abi/CNDVote.json'
  import Vote from './Vote.svelte'

  const provider = new ethers.providers.JsonRpcProvider($publicPolygonRPC)

  // interface VoteData {
  //   owner: string
  //   title: string
  //   summary: string
  //   content: string
  //   note: string
  //   proposalBlock: Number
  //   votePeriod: Number
  //   agree: Number
  //   disagree: Number
  //   result: Number
  //   endBlock: Number
  // }

  let voteData = {
    owner: '',
    title: '',
    summary: '',
    content: '',
    note: '',
    proposalBlock: 0,
    votePeriod: 0,
    agree: 0,
    disagree: 0,
    result: 0,
    endBlock: 0
  }

  let mdContent = ``
  let blocknumber
  let pageId
  let leftBlock

  onMount(() => {
    getPageId()
    getVoteInfo()
    setInterval(() => {
      getBlockNumber()
    }, 1000)
  })

  beforeUpdate(() => {
    // test()
  })

  $: leftBlock = voteData.endBlock - blocknumber

  async function getVoteInfo() {
    const contract = new ethers.Contract($VoteContract, CNDVoteABI, provider)
    contract.proposals(pageId).then(data => {
      voteData.owner = data[0]
      voteData.title = data[1]
      voteData.summary = data[2]
      voteData.content = data[3]
      voteData.note = data[4]
      voteData.proposalBlock = parseInt(data[5])
      voteData.votePeriod = parseInt(data[6])
      mdContent = voteData.content
      voteData.endBlock = voteData.proposalBlock + voteData.votePeriod
      mdContent = mdContent.split('\\n').join('<br>')
      // console.log(mdContent)
    })
    contract.forVotes(pageId).then(data => {
      voteData.agree = data
    })
    contract.againstVotes(pageId).then(data => {
      voteData.disagree = data
    })
    contract.result(pageId).then(data => {
      voteData.result = data
    })
  }

  async function getPageId() {
    pageId = parseInt($location.slice(6))
  }

  async function getBlockNumber() {
    blocknumber = await provider.getBlockNumber()
    // console.log(blocknumber)
  }
</script>

<Header />
<div class="container">
  <div class="container-content">
    <div class="vote-wrap">
      <div class="vote-content-box">
        <div class="vote-content">
          <div class="vote-section">
            <div class="vote-title">{voteData.title}</div>
          </div>
          <div class="vote-section">
            {#if voteData.result === 0}
              <div class="vote-sub-title">Voting is underway.</div>
            {:else if voteData.result === 1}
              <div class="vote-sub-title">The vote has been canceled.</div>
            {:else if voteData.result === 2}
              <div class="vote-sub-title">vote again on this agenda.</div>
            {:else if voteData.result === 3}
              <div class="vote-sub-title">carry out the agenda.</div>
            {:else if voteData.result === 4}
              <div class="vote-sub-title">reject the agenda.</div>
            {:else}
              <div class="vote-sub-title">Result</div>
            {/if}
          </div>
          <div class="vote-section">
            <div class="vote-sub-title">Blocks left until the voting is over.</div>
            {#if voteData.result === 0}
              <div class="numbers-num">{leftBlock} Block</div>
            {:else if voteData.result !== 0}
              <div class="numbers-num">0 Block</div>
            {/if}
          </div>
          <div class="vote-section">
            <div class="vote-numbers-wrap">
              <div class="vote-numbers">
                <div class="numbers-agree">Agreement</div>
                <div class="numbers-num">{voteData.agree}</div>
              </div>
              <div class="vote-numbers">
                <div class="numbers-disagree">Opposition</div>
                <div class="numbers-num">{voteData.disagree}</div>
              </div>
            </div>
          </div>
          <div class="vote-section">
            <div class="vote-sub-title">Summary</div>
            <div class="vote-summary">{voteData.summary}</div>
          </div>
          <div class="vote-section">
            <div class="vote-sub-title">Content</div>
            <div class="vote-paragraph">
              <SvelteMarkdown source="{mdContent}" />
            </div>
          </div>
          <div class="vote-section">
            <div class="vote-sub-title">Reference</div>
            <div class="vote-memo">{voteData.note}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if voteData.result === 0}
  <Vote pageId="{pageId}" />
{/if}

<style lang="scss">
  .container {
    margin-bottom: 30px;
  }

  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
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

  .vote-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 100%;
  }

  .vote-title {
    font-size: 1.8rem;
  }

  .vote-sub-title {
    font-size: 1.3rem;
    color: $highlight-color;
    margin-bottom: 10px;
  }

  .vote-numbers-wrap {
    display: flex;
  }

  .vote-numbers {
    display: flex;
    width: 50%;
    margin-right: 15px;
  }

  .numbers-agree {
    font-size: 1.3rem;
    margin-right: 10px;
    color: aquamarine;
  }

  .numbers-disagree {
    font-size: 1.3rem;
    margin-right: 10px;
    color: tomato;
  }

  .numbers-num {
    font-size: 1.3rem;
  }

  .vote-paragraph {
    line-height: 20px;
  }

  @media screen and (max-width: 768px) {
    .vote-wrap {
      width: 100%;
    }

    .vote-paragraph {
      line-height: 20px;
      width: 100%;
    }
  }
</style>
