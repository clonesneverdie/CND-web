<script>
  import { onMount } from 'svelte'
  import axios from 'axios'

  let lotusList = []

  onMount(() => {
    axios.get('https://api.clonesneverdie.com/lotus/list').then(response => {
      lotusList = response.data
    })
  })
</script>

<div class="sub-content">
  <div class="sub-title"><b>Lotus List</b></div>
  <div class="sub-item">
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Entire Staking List</b></div>
      <div class="sub-item-explain">
        This list is the entire list of lotus currently staked. This list is updated every hour.
      </div>
      <ul class="sub-item-list-head">
        <li class="list-item">
          <div class="item-number">No.</div>
          <div class="item-id">Lotus ID</div>
          <div class="item-clones-num">Clones</div>
          <div class="item-nectar">Potential Nectar</div>
          <div class="item-address">Owner</div>
        </li>
      </ul>
      <ul class="sub-item-list-long">
        {#each lotusList as item, index}
          <li class="list-item">
            <div class="item-number">{index + 1}</div>
            <div class="item-id">{item.lotusId}</div>
            <div class="item-clones-um">{item.clonesNum}</div>
            <div class="item-nectar">{item.potentialNectar}</div>
            <div class="item-address">{`${item.owner.slice(0, 6)}`}</div>
          </li>
        {/each}
      </ul>
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
