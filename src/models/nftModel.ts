import { OfferModel } from './offerModel'
import { CollectionModel } from './collectionModel'
import { SaleModel } from './saleModel'

export type NFTModel = {
  asset_id: string
  balance: string
  collection: CollectionModel
  kind: 'erc1155' | 'erc721'
  name: string
  offer: OfferModel | null
  rank: number
  sale: SaleModel | null
  thumbnail: string
}
