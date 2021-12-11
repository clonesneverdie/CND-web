<script lang="ts">
  import ContractList from '@/components/ContractList/index.svelte'
</script>

<div class="container">
  <div class="container-title">About</div>
  <div class="container-content">
    <div class="container-paragraph">There is information about CxNxD here. Check out about CxNxD!</div>
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
