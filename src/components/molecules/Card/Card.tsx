import { Zoom } from 'react-awesome-reveal'

import { Text } from 'components/atoms/Text'
import { Icon } from 'components/atoms/Icon'
import { Avatar } from 'components/atoms/Avatar'
import { Button } from 'components/molecules/Button'

type CardsProps = {
    name: string
    thumbnail: string
    avatar: string
    certified: boolean
    balance: string
    kind: string
    offer: number | null
    saleId: string | null
    onPressBuy: () => void
}
export const Card = ({
    name,
    thumbnail,
    avatar,
    certified,
    balance,
    kind,
    offer,
    saleId,
    onPressBuy
}: CardsProps) => {
  return (
      <Zoom triggerOnce>
          <div className="group border relative border-zinc-700 rounded-2xl">
              <div>
                  <img src={thumbnail}
                      alt="nft"
                      className={`rounded-t-3xl w-full h-full bg-white ${kind === 'erc1155' ? 'stacked' : ''}`}
                  />
                  <Avatar displayBadge={certified} outline src={avatar} className="absolute bottom-8 left-4" />
              </div>
              <div className="flex flex-col px-4 pb-4 -mt-4">
                  <Text type="regular" className='text-left mb-6 truncate w-9/12'>{name}</Text>
                  <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-col text-left">
                          <Text type="small" className='text-zinc-400'>Price</Text>
                          <div className="flex flex-row justify-center items-center space-x-2">
                              <Icon src="images/tag.svg" />
                              <Text type="regular">{Math.round(parseFloat(balance)) / 100}</Text>
                          </div>
                      </div>
                      {
                          (offer != null) && (
                              <div className={`flex flex-col text-right ${saleId != null ? 'group-hover:hidden' : ''}`}>
                                  <Text type="extra-small" className='text-zinc-400'>Best offer</Text>
                                  <div className="flex flex-row justify-center items-center space-x-2">
                                      <Icon src="images/tag.svg" fillColor='#4fd2c0' />
                                      <Text type="small" className="font-bold">{Math.round(parseFloat(offer.toString())) / 100}</Text>
                                  </div>
                              </div>
                          )
                      }
                      {(saleId != null) && <Button label="Buy Now" onPress={onPressBuy} className="hidden group-hover:block self-end" />}
                  </div>
              </div>
          </div>
      </Zoom>
  )
}
