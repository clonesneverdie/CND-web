<script lang="ts">
  import Header from './Header.svelte'
</script>

<Header />
<div class="container">
  <div class="container-content">
    Pax
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

  @media screen and (max-width: 768px) {
    
  }
</style>
