<script lang="ts">
  import KlaytnContractList from '@/components/ContractList/klaytn.svelte'
  import ContractList from '@/components/ContractList/index.svelte'
</script>

<div class="container">
  <div class="container-title">About</div>
  <div class="container-content">
    <div class="container-paragraph">CxNxD 프로젝트에 대한 정보입니다. 지금 정보를 확인하세요!</div>
    <KlaytnContractList />
    <br />
    <ContractList />
  </div>
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    min-height: 80vh;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .container-paragraph {
    width: 60%;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    .container-paragraph {
      width: 100%;
    }
  }
</style>
