import { Text } from 'components/atoms/Text'

type ButtonProps = {
    label: string
    onPress: () => void
    className?: string
    disabled?: boolean
}
export const Button = ({
    label,
    onPress,
    className = '',
    disabled = false
}: ButtonProps) => {
  return (
      <button className={`rounded-md px-2 py-1 bg-blue-800 hover:bg-blue-700 transition-all duration-500
        ${className}
      `}
      disabled={disabled}
      onClick={onPress}>
          <Text type='small' className='font-bold'>{label}</Text>
      </button>
  )
}
