<script lang="ts">
  interface ContractList {
    contractTitle: string
    contractAddress: string
    polygonscanLink: string
  }

  const contractListData: Array<ContractList> = [
    {
      contractTitle: 'CND V1',
      contractAddress: '0x9f05782f940ae8fc2615ff5a30b90da41928bf8a',
      polygonscanLink: `https://polygonscan.com/token/0x9f05782f940ae8fc2615ff5a30b90da41928bf8a`
    },
    {
      contractTitle: 'CND V2',
      contractAddress: '0x6c15030A0055D7350c89EbbD460EB4F145462Fbd',
      polygonscanLink: `https://polygonscan.com/token/0x6c15030A0055D7350c89EbbD460EB4F145462Fbd`
    },
    {
      contractTitle: 'CND Asset',
      contractAddress: '0x3d02C1b6006f5E6D46dd9bbcbC7196B279f9caE6',
      polygonscanLink: `https://polygonscan.com/token/0x3d02C1b6006f5E6D46dd9bbcbC7196B279f9caE6`
    },
    {
      contractTitle: 'PAX',
      contractAddress: '0x818E6b4bEa1C1FfF712464FE057d4791Efc6D552',
      polygonscanLink: `https://polygonscan.com/token/0x818E6b4bEa1C1FfF712464FE057d4791Efc6D552`
    },
    {
      contractTitle: 'Klaytn PAX',
      contractAddress: '0x95f04d09A8DC87EDCF1Ba6FeD443993FA2466465',
      polygonscanLink: `https://scope.klaytn.com/token/0x95f04d09A8DC87EDCF1Ba6FeD443993FA2466465?tabId=tokenTransfer`
    },
    {
      contractTitle: 'Quickswap LP Token',
      contractAddress: '0xf7463107b942a73bb002d42e50e549810479a662',
      polygonscanLink: `https://polygonscan.com/address/0xf7463107b942a73bb002d42e50e549810479a662`
    },
    {
      contractTitle: 'Klayswap LP Token',
      contractAddress: '0x21e254edd252c753f92c763235b4f98d2a78dd3d',
      polygonscanLink: `https://scope.klaytn.com/token/0x21e254edd252c753f92c763235b4f98d2a78dd3d?tabId=tokenTransfer`
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
