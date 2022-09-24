import React from 'react'

export type TextFonts =
    | 'title'
    | 'subtitle'
    | 'regular'
    | 'small'
    | 'extra-small'
    | 'modal-title'

type TextProps = {
    children: React.ReactNode
    type: TextFonts
    className?: string
}
type TagTypes = 'p' | 'h1' | 'h2' | 'h3'

export const Text = ({
    children,
    type,
    className = ''
}: TextProps) => {
    let HTML_TAG: TagTypes = 'p'
    const commonStyle = 'font-sans text-white'

    const applyTypography = (type: TextProps['type']) => {
        switch (type) {
            case 'title':
                HTML_TAG = 'h1'
                return `${commonStyle} tracking-wide font-bold md:text-5xl text-3xl`
            case 'subtitle':
                HTML_TAG = 'h2'
                return `${commonStyle} text-zinc-400 font-regular md:text-2xl text-xl`
            case 'regular':
                HTML_TAG = 'p'
                return `${commonStyle} font-semibold md:text-xl text-lg`
            case 'small':
                HTML_TAG = 'p'
                return `${commonStyle} font-regular md:text-lg text-md`
            case 'extra-small':
                HTML_TAG = 'p'
                return `${commonStyle} text-zinc-400 font-regular md:text-[15px] text-md`
            case 'modal-title':
                HTML_TAG = 'h3'
                return `${commonStyle} font-bold md:text-3xl text-xl`
            default:
                HTML_TAG = 'p'
                return `${commonStyle}`
        }
    }

    return (
        <HTML_TAG
            className={`${applyTypography(type)} ${className}`}
        >
            {children}
        </HTML_TAG>
    )
}
