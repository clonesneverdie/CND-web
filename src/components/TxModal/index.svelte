<script lang="ts">
  export let showModal: boolean
  export let txHash: any
  export let txHashLink: any
  import { RingLoader } from 'svelte-loading-spinners'
</script>

{#if showModal}
  <div class="modal">
    <div class="modal_body">
      <div class="sub-title"><b>Transaction</b></div>
      {#if txHash}
        <div class="small-title">Transaction Success</div>
        <div class="state">
          <div class="small-title">Transaction hash</div>
          <a class="txHash" href="{txHashLink}" target="_blank">{txHash.slice(0, 25)}...</a>
        </div>
        <div class="button" on:click><b>Confirm</b></div>
      {:else}
        <div class="state">
          <div class="loading">
            <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
          </div>
          <br />
          <div>Please wait a moment...</div>
          <!-- <div class="state">
            <div class="small-title">Transaction hash</div>
            <a class="txHash" href="{txHashLink}" target="_blank">{txHash.slice(0, 25)}...</a>
          </div> -->
        </div>
        <div class="wait"><b>Wait</b></div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100;
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
  .button {
    width: 100%;
    height: auto;
    background-color: $highlight-color;
    color: white;
    padding: 10px;
    font-size: 1.2rem;
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;
  }

  .wait {
    width: 100%;
    height: auto;
    background-color: lightgray;
    color: white;
    padding: 10px;
    font-size: 1.2rem;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .small-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .txHash {
    font-size: 0.8rem;
    color: $highlight-color;
  }
</style>
