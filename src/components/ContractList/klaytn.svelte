<script lang="ts">
  interface ContractList {
    contractTitle: string
    contractAddress: string
    polygonscanLink: string
  }

  const contractListData: Array<ContractList> = [
    {
      contractTitle: 'CxNxD Kings (V1)',
      contractAddress: '0x5893BfabeE0f482f7B025171020CfFe8EE9C0c66',
      polygonscanLink: `https://scope.klaytn.com/nft/0x5893bfabee0f482f7b025171020cffe8ee9c0c66`
    },
    {
      contractTitle: 'CxNxD Mu (V2)',
      contractAddress: '0x19FEb74A239fC7D6583d8C434A388880747E8dff',
      polygonscanLink: `https://scope.klaytn.com/nft/0x19FEb74A239fC7D6583d8C434A388880747E8dff`
    }
  ]
</script>

<div class="content">
  <div class="subtitle"><b>Klaytn Contracts</b></div>
  {#each contractListData as item}
    <div class="sub-content">
      <div class="sub-content-title">- {item.contractTitle}</div>
      <div class="sub-content-content"><a href="{item.polygonscanLink}" target="_blank">{item.contractAddress}</a></div>
    </div>
  {/each}
</div>

<style lang="scss">
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .subtitle {
    color: $highlight-color;
  }

  .sub-content {
    font-size: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .sub-content-title {
    width: 30%;
    /* text-align: right; */
    /* margin-right: 30px; */
  }

  .sub-content-content {
    width: 70%;
    a {
      color: $highlight-color;
    }
    a:hover {
      color: white;
    }
  }

  @media screen and (max-width: 768px) {
    .content {
      width: 100%;
    }
    .sub-content {
      font-size: 0.8rem;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .sub-content-title {
      width: 100%;
      text-align: left;
    }

    .sub-content-content {
      width: 100%;
    }
  }
</style>
