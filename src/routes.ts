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

import NotFound from './pages/NotFound/index.svelte'

export default {
  '/': Home,
  '/wallet': Wallet,
  '/pax': Pax,
  '/lotus': Lotus,
  '/mint': Mint,
  '/comics': Toon,
  '/comics/:id': ToonContent,
  '/vote': Vote,
  '/vote/:id': VoteContent,
  '/about': About,
  // Catch-all, must be last
  '*': NotFound,
}