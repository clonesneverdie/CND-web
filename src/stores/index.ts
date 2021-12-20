import {writable, readable} from 'svelte/store'

// data
export const cost:any = writable(0)

// blockchain
export const isConnect:any = writable(false)
export const provider:any = writable(null)
export const signer:any = writable(null)
export const myAddress:any = writable(null)
export const myAddressShort:any = writable(null)
export const myBalance:any = writable(0)
export const publicPolygonRPC:any = readable('https://polygon-rpc.com/')

// CNDV2 contract
export const CNDV2Contract = readable('0x6c15030A0055D7350c89EbbD460EB4F145462Fbd')
export const CNDV2TotalSupply:any = writable(0)
export const myCNDV2Balance:any = writable(0)
export const myCNDV2List:any = writable([])
export const intMyCNDV2List:any = writable([])
export const walletLoading:any = writable(true)

// Nectar contract
export const NectarContract = readable('0x662e0c208238Fc014429c8C4F28f82AaC6F59b9D')
export const myNectarBalance:any = writable(0)
export const lotusLoading:any = writable(true)

// CNDV2Sale contract
export const CNDV2SaleContract = readable('0x841A63491027b3cffBDBC748AB98D8a7944eb197')


// LotusStaking contract
export const LotusContract = readable('0x4172DF61f6842870049FcD07b8E9FE6CEA7789EA')
export const myLotusList:any = writable([])

// AssetLottery contract
export const AssetLotteryContract = readable('0x85DcA015c0f91E68658DD61B996405b71D9c4721')
export const saleCount:any = writable(0)

// Vote contract
export const VoteContract = readable('0x35EFE0675eFf8A22Bb33A2b2cA1cf535B1e5823e')

// PAX contract
export const PaxContract = readable('0x818E6b4bEa1C1FfF712464FE057d4791Efc6D552')
export const myPaxBalance:any = writable(0)

// Pax Emitter
export const PaxEmitter = readable('0x97C2315DE88107DBACb0E911046F15f3bEC94360')

// White Hole Contract
export const WhiteholeContract = readable('0xD6125A96a19f57EA1966d197497dA6D9E6D10Ac8')
export const myPaxsetBalance:any = writable(0)

// Buyback contract
export const Buyback = readable('0xe5136690a66672181E8791B5d269ac9143eb6c97')

// Dev Token contract
export const DevTokenContract = readable('0x0778717f440d246ff43d7d1c5c71C89D99A86e39')
export const myDevTokenBalance:any = writable(0)

// Dev Fund contract
export const DevFundContract = readable('0xC61a539442dC3e5403B5c465500feB50c11A64B1')
export const myDevFundClaimable:any = writable(0)
export const myStakedDevToken:any = writable(0)

// V2 Auto Mining contract
export const V2AutoMiningContract = readable('0x5093F55B56e5c12663E8C08A80fc054568D50dBF')
export const myV2TotalClaimable:any = writable(0)

// Quickswap LP Token contract
export const QuickswapLPContract = readable('0xf7463107b942a73bb002d42e50e549810479a662')
export const myQLPTokenBalance:any = writable(0)

// Quickswap Airdrop Pool Contract
export const QuickswapStakingPoolContract = readable('0xAAd94479D53C31Fcb0C8C6Da1d83c124bd271f96')
export const myQLPClaimable:any = writable(0)
export const myStakedQLP:any = writable(0)
