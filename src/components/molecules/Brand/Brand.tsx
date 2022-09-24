import { Text } from 'components/atoms/Text'

export const Brand = () => {
    return (
        <section className="flex flex-col p-12 gap-6 border-t border-zinc-800 text-center">
            <Text type="title">Explore</Text>
            <div className="md:w-1/2 mx-auto">
                <Text type="subtitle">Explore more than 100k of amazing NFT's on Kalao marketplace and filters them at your convenience.</Text>
            </div>
        </section>
    )
}
