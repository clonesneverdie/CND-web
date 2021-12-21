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
      image: '/assets/pax-menu1.png',
      name: 'V2 Auto Mining',
      description: 'CxNxD V2 clones automatically mine $PAX. Claim $PAX with your clones!',
      link: () => push('/pax/v2')
    },
    {
      image: '/assets/pax-menu2.png',
      name: 'Quickswap LP Staking',
      description: 'Get $PAX by supplying liquidity to QuickSwap and staking the LP token you received!',
      link: () => push('/pax/quickswap')
    },
    {
      image: '/assets/pax-menu3.png',
      name: 'Klayswap Pool',
      description: 'Supply liquidity to the clay swap and get $PAX!',
      link: () => openInNewTab('https://klayswap.com/exchange/pool/detail/0x21e254edd252c753f92c763235b4f98d2a78dd3d')
    },
    {
      image: '/assets/pax-menu4.png',
      name: 'White Hole',
      description: 'Make a single staking of $PAX to get additional $PAX without loss!',
      link: () => push('/pax/whitehole')
    },
    {
      image: '/assets/pax-menu7.png',
      name: '$PAX Bridge',
      description: 'Use Chain Horizon to bridge my $PAX to another blockchain!',
      link: () => openInNewTab('https://pax.chainhorizon.org/')
    },
    // {
    //   image: '/assets/event1.jpeg',
    //   name: 'Clone Nation',
    //   description: 'V2 Auto Mining Pool is V2 Auto mining Poolllllllllllllllll Hey bro!',
    //   link: () => alert('Coming Soon')
    // },
    {
      image: '/assets/pax-menu5.png',
      name: 'Clone Games',
      description: 'The CxNxD team is developing a P2E game based on the clone world wide. Please wait for the game!',
      link: () => alert('Coming Soon')
    },
    {
      image: '/assets/pax-menu6.png',
      name: 'Lotus',
      description: 'You can mine the $Nectar token, a meme token.',
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
    <div class="pax-info-wrap">
      <div class="pax-info">
        <a href="https://info.quickswap.exchange/#/token/0x818e6b4bea1c1fff712464fe057d4791efc6d552" target="_blank"
          >$PAX Quickswap chart</a
        >
      </div>
      <div class="pax-info">
        <a href="https://dexata.kr/?tokenA=0x95f04d09a8dc87edcf1ba6fed443993fa2466465&tokenB=" target="_blank"
          >$KPAX Dexata chart</a
        >
      </div>
    </div>
    <!-- <div class="pool-info">Chart</div> -->
    <div class="pool-info">$PAX Menu</div>
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

  .pax-info-wrap {
    padding: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    a {
      color: $highlight-color;
      margin: 10px;
    }
  }

  .pax-info {
    width: 100%;
    display: flex;
    justify-content: center;
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
