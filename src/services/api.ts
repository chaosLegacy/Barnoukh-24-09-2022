import axios from 'axios'
import { NFTModel } from 'models/nftModel'

// Fetch All nfts from the given endpoint based on NFTModel
export const getNfts = async () => {
    return await axios.get<{ nfts: NFTModel[] }>(
      'https://test-api.dev.kalao.io/search'
    )
}
export type ServerError = { error: string }

export type dataProps = {
  trait_type: string
  value: string
}
// Fetch All attributes from the given endpoint based on dataProps
export const getAttributes = async () => {
    return await axios.get<dataProps[][]>(
      'https://media.kalao.io/technical/ryu_attributes.json'
    )
}

// Retrieve the status of a sale based on it saleId
export const executeSale = async (saleId: string) => {
  return await axios.get<{ status: boolean }>(
    `https://test-api.dev.kalao.io/sale/status/${saleId}`
  )
}
