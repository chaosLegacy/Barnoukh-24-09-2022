import { ReactSVG } from 'react-svg'

type IconProps = {
  src: string
  fillColor?: string
  width?: number
  height?: number
}
export const Icon = (
  {
    src,
    fillColor = '#fff',
    width = 16,
    height = 16
  }: IconProps) => {
  return (
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        svg.classList.add('svg-class-name')
        svg.setAttribute('style', `width: ${width}px; height:${height}px`)
        const firstGElement = svg.querySelector('g path')
        firstGElement?.setAttribute('fill', fillColor)
      }}
    />
  )
}
