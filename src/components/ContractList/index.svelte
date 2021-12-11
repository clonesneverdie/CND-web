<script lang="ts">
  interface ContractList {
    contractTitle: string
    contractAddress: string
    polygonscanLink: string
  }

  const contractListData: Array<ContractList> = [
    {
      contractTitle: 'CND V2',
      contractAddress: '0x6c15030A0055D7350c89EbbD460EB4F145462Fbd',
      polygonscanLink: `https://polygonscan.com/token/0x6c15030A0055D7350c89EbbD460EB4F145462Fbd`
    },
    {
      contractTitle: 'CND V2 Sale',
      contractAddress: '0x841A63491027b3cffBDBC748AB98D8a7944eb197',
      polygonscanLink: `https://polygonscan.com/address/0x841A63491027b3cffBDBC748AB98D8a7944eb197`
    },
    {
      contractTitle: 'Nectar',
      contractAddress: '0x662e0c208238Fc014429c8C4F28f82AaC6F59b9D',
      polygonscanLink: `https://polygonscan.com/token/0x662e0c208238Fc014429c8C4F28f82AaC6F59b9D`
    },
    {
      contractTitle: 'Lotus',
      contractAddress: '0x4172DF61f6842870049FcD07b8E9FE6CEA7789EA',
      polygonscanLink: `https://polygonscan.com/address/0x4172DF61f6842870049FcD07b8E9FE6CEA7789EA`
    }
  ]
</script>

<div class="content">
  <div class="subtitle"><b>Contracts</b></div>
  {#each contractListData as item}
    <div class="sub-content">
      <div class="sub-content-title">{item.contractTitle}</div>
      <div class="sub-content-content"><a href="{item.polygonscanLink}" target="_blank">{item.contractAddress}</a></div>
    </div>
  {/each}
</div>

<style lang="scss">
  .content {
    width: 50%;
  }
  .subtitle {
    color: $highlight-color;
  }

  .sub-content {
    font-size: 0.9rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .sub-content-title {
    width: 20%;
    text-align: right;
    margin-right: 10px;
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
      font-size: 0.6rem;
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    .sub-content-title {
      width: 100%;
    }

    .sub-content-content {
      width: 100%;
    }
  }
</style>
