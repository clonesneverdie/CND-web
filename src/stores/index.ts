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
export const PaxContract = readable('0x2aD7be3941a9E912Ad4Caea838C5311993ee529b')
export const myPaxBalance:any = writable(0)

// Pax Emitter
export const PaxEmitter = readable('0x06679733e17286e30e53CDdfcaA1a07a381E9Efb')

// White Hole Contract
export const WhiteholeContract = readable('0x53E8d9DE8e8Eb094392471e14c563e2F8dFae0Df')
export const myPaxsetBalance:any = writable(0)

// Buyback contract
export const Buyback = readable('0x0e2628fA3B5097a696a601E9242f60498E26bfb9')
