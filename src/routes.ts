import Home from './pages/Home/index.svelte'
import Mint from './pages/Mint/index.svelte'
import Wallet from './pages/Wallet/index.svelte'
import Lotus from './pages/Lotus/index.svelte'
import Toon from './pages/Toon/index.svelte'
import ToonContent from './pages/Toon/Content.svelte'
import About from './pages/About/index.svelte'
import Vote from './pages/Vote/index.svelte'
import VoteContent from './pages/Vote/Content.svelte'
import Pax from './pages/Pax/index.svelte'
import V2Mining from './components/Pax/V2Mining.svelte'
import QuickswapPool from './components/Pax/QuickswapPool.svelte'
import Whitehole from './components/Pax/Whitehole.svelte'
import DevFund from './components/Pax/DevFund.svelte'

import NotFound from './pages/NotFound/index.svelte'

export default {
  '/': Home,
  '/wallet': Wallet,
  '/mint': Mint,
  '/comics': Toon,
  '/comics/:id': ToonContent,
  '/vote': Vote,
  '/vote/:id': VoteContent,
  '/about': About,
  '/pax': Pax,
  '/pax/lotus': Lotus,
  '/pax/v2': V2Mining,
  '/pax/quickswap': QuickswapPool,
  '/pax/whitehole': Whitehole,
  '/pax/devfund': DevFund,

  // Catch-all, must be last
  '*': NotFound,
}