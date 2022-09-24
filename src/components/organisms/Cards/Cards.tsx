import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'
import checkmark from 'animations/checkmark.json'
import scanner from 'animations/scanner.json'

import { NFTModel } from 'models/nftModel'

import { Text } from 'components/atoms/Text'
import { Icon } from 'components/atoms/Icon'
import { Modal } from 'components/atoms/Modal'

import { Card } from 'components/molecules/Card'
import { Button } from 'components/molecules/Button'

import { executeSale, getNfts, ServerError } from 'services/api'

export const Cards = () => {
    const [nftsLoading, setNftsLoading] = useState<boolean>(false)
    const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false)
    const [purchaseStatus, setPurchaseStatus] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [nfts, setNfts] = useState<NFTModel[]>([])
    const [nft, setNft] = useState<NFTModel>()
    const fetchNfts = async () => {
        try {
            setNftsLoading(true)
            const response = await getNfts()
            setNfts(response.data.nfts)
            setNftsLoading(false)

            return response.data
        } catch (error) {
            setNftsLoading(false)
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerError>
                if (serverError?.response != null) {
                    toast.error(serverError.response.data.error)
                    return serverError.response.data
                }
            }
            return { errorMessage: 'server is down' }
        }
    }

    useEffect(() => {
        const unsubscribe = fetchNfts()
        return () => {
            void unsubscribe
        }
    }, [])

    const showModal = (nft: NFTModel) => {
        setNft(nft)
        setPurchaseStatus(false)
        setOpenModal(true)
    }

    const closeModal = () => {
        setPurchaseStatus(false)
        setOpenModal(false)
    }

    const completePurchase = async () => {
        if (nft == null || nft.sale == null) return
        try {
            setPurchaseLoading(true)
            const status = await executeSale(nft.sale.sale_id)
            setPurchaseLoading(false)
            setPurchaseStatus(status.data.status)
            if (status.data.status) {
                toast.success(`You successfully purchased ${nft.name}`)
            } else {
                toast.error('Sale is not active anymore')
            }
            const nftsLeft = nfts.filter((n) => n.asset_id !== nft?.asset_id)
            setNfts(nftsLeft)
            setTimeout(() => {
                closeModal()
            }, 1000)
        } catch (error) {
            setPurchaseLoading(false)
            closeModal()
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerError>
                if (serverError?.response != null) {
                    toast.error(serverError.response.data.error)

                    return serverError.response.data
                }
            }
            return { errorMessage: 'server is down' }
        }
    }

    return (
        <section>
        {
            nftsLoading
                    ? <div className='flex h-fit flex-1 justify-center items-center py-28'>
                        <Lottie animationData={scanner} loop style={{ width: 200, height: 200 }} />
                     </div>
            : (
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                    {
                        nfts.map(nft => (
                            <Card key={nft.asset_id}
                                name={nft.name}
                                kind={nft.kind}
                                thumbnail={nft.thumbnail}
                                balance={nft.balance}
                                avatar={nft.collection.avatar}
                                certified={nft.collection.certified}
                                offer={(nft.offer !== null) ? nft.offer.unitary_price_float : null}
                                saleId={(nft.sale !== null) ? nft.sale.sale_id : null}
                                onPressBuy={() => showModal(nft)}
                            />
                        )
                        )
                    }
                </div>
            )
        }
            <Modal modalIsOpen={openModal} onRequestClose={closeModal}>
                <section className="flex flex-col items-center justify-center bg-zinc-900 p-8 px-12 rounded-2xl">
                    <button onClick={closeModal} className="text-zinc-600 self-end">
                        <Text type="subtitle">&#215;</Text>
                    </button>
                    {
                        (nft != null) && (
                            <>
                                {/* Header section  */}
                                <Text type="modal-title" className="text-center">Buy Item</Text>
                                <div className="flex flex-col items-start justify-start w-full mt-11 gap-2">
                                    <Text type="small" className="text-zinc-400 font-bold">Summary</Text>
                                    {/* Modal content: price, name and thumbnail */}
                                    <div className='flex w-full flex-row items-center justify-between space-x-20'>
                                        <div className="flex flex-row space-x-3">
                                            <img src={nft.thumbnail} alt={nft.name} className="rounded-md w-14 h-14 bg-white" />
                                            <div className="flex flex-col items-start">
                                                <Text type="small" className="truncate w-9/12">{nft.name}</Text>
                                                <div className="flex flex-row justify-center items-center space-x-3">
                                                    <Text type="small" className="text-zinc-400">{nft.collection.name}</Text>
                                                    {
                                                        nft.collection.certified && <img src="images/verified.png" alt="badge" className="w-5 h-5" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-center space-x-2">
                                            <Icon src="images/tag.svg" width={20} height={20} />
                                            <Text type="modal-title">{Math.round(parseFloat(nft.balance)) / 100}</Text>
                                        </div>
                                    </div>
                                    {/* Transaction section */}
                                    <div className="flex items-center justify-center border-t border-zinc-800 mt-6 mb-4 mx-auto w-10/12 h-4" />
                                    <div className="mb-4 flex flex-row justify-between items-center w-full">
                                        <Button onPress={completePurchase} disabled={purchaseLoading} label="Complete Purchase" />
                                        {purchaseStatus && <Lottie animationData={checkmark} loop={false} />}
                                    </div>
                                </div>
                            </>
                        )
                    }
                </section>
            </Modal>
        </section>
    )
}
