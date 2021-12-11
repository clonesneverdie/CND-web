<script>
  import { lotusLoading, myLotusList } from '@/stores/index'
  import LotusModal from './LotusModal.svelte'
  import { RingLoader } from 'svelte-loading-spinners'

  let showModal = false

  let lotusObj
  function lotusDetail(obj) {
    lotusObj = obj
    openModal()
    console.log(showModal)
  }
  function openModal() {
    showModal = !showModal
  }
</script>

<div class="sub-content">
  <div class="sub-title"><b>My Staking</b></div>
  <div class="sub-item">
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>My Staking List</b></div>
      <div class="sub-item-explain">This is a list of my clones in Lotus. You can mint $Nectar.</div>
      <ul class="sub-item-list-head">
        <li class="list-item">
          <div class="item-number">No.</div>
          <div class="item-number">Clones</div>
          <div class="item-name">Nectar</div>
          <div class="item-id">Check Detail</div>
        </li>
      </ul>
      <ul class="sub-item-list-long">
        {#each $myLotusList as item, index}
          <li class="list-item">
            <div class="item-number">{index + 1}</div>
            <div class="item-number">{item.power}</div>
            <div class="item-number">{item.PotentialNectar}</div>
            <div class="check-btn" on:click="{lotusDetail(item)}">Check</div>
          </li>
        {/each}
        {#if $lotusLoading === false}
          <div class="loading">
            <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
          </div>
        {/if}
      </ul>
    </div>
  </div>
</div>
<LotusModal showModal="{showModal}" lotusObj="{lotusObj}" on:click="{openModal}" />

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
    height: 490px;
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

  .sub-item-list-long {
    height: 300px;
    overflow: scroll;
    padding-left: 10px;
    padding-right: 10px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .sub-item-list-long::-webkit-scrollbar {
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

  .check-btn {
    background-color: $highlight-color;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
  }

  .check-btn:active {
    opacity: 0.7;
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
