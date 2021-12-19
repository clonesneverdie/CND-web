<script lang="ts">
  import Header from './Header.svelte'
  import PoolBox from './PoolBox.svelte'
  import { push } from 'svelte-spa-router'

  interface PoolInfo {
    image: string
    name: string
    description: string
    link: any
  }

  const poolData: Array<PoolInfo> = [
    {
      image: '/assets/event1.jpeg',
      name: 'V2 Auto Mining',
      description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
      link: () => push('/pax/v2')
    },
    {
      image: '/assets/event1.jpeg',
      name: 'Quickswap LP Staking',
      description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
      link: () => push('/pax/quickswap')
    },
    {
      image: '/assets/event1.jpeg',
      name: 'Klayswap Pool',
      description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
      link: () => openInNewTab('https://google.com')
    },
    {
      image: '/assets/event1.jpeg',
      name: 'White Hole',
      description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
      link: () => push('/pax/whitehole')
    },
    {
      image: '/assets/event1.jpeg',
      name: 'Clone Nation',
      description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
      link: () => alert('Coming Soon')
    },
    {
      image: '/assets/event1.jpeg',
      name: 'Clone Games',
      description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
      link: () => alert('Coming Soon')
    },
    {
      image: '/assets/event1.jpeg',
      name: 'Lotus',
      description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
      link: () => push('/pax/lotus')
    }
  ]

  function openInNewTab(url: any) {
    const win: any = window.open(url, '_blank')
    win.focus()
  }
</script>

<Header />
<div class="container">
  <div class="container-content">
    <div class="logo-wrap">
      <img class="logo" src="/assets/pax-logo.png" alt="pax-logo" />
    </div>
    <div class="pool-info">Chart</div>
    <div class="pool-info">Pool List</div>
    <div class="pool-list">
      {#each poolData as item}
        <div class="pool-box-wrap">
          <PoolBox image="{item.image}" name="{item.name}" description="{item.description}" link="{item.link}" />
        </div>
      {/each}
    </div>
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

  .logo-wrap {
    width: 20%;
  }

  .logo {
    width: 100%;
  }

  .pool-info {
    width: 100%;
    font-size: 1.8rem;
    margin-bottom: 50px;
  }

  .pool-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .pool-box-wrap {
    width: 33.3%;
    padding: 10px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    .logo-wrap {
      width: 50%;
    }
    .pool-box-wrap {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
  }
</style>
