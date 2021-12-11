<script lang="ts">
  import Router from 'svelte-spa-router'
  import routes from './routes'

  import AppBar from '@/components/AppBar/index.svelte'
  import Footer from '@/components/Footer/index.svelte'
</script>

<div class="wrap">
  <AppBar />
  <Router routes="{routes}" />
</div>
<Footer />

<style lang="scss">

  .wrap {
    max-width: 1280px;
    margin: 0px auto;
  }

  @media screen and (max-width: 768px) {
    .wrap {
      margin: 0px 0px;
    }
  }
</style>
