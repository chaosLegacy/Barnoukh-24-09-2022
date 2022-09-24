
export type AvatarProps = {
  displayBadge?: boolean
  outline?: boolean
  src?: string
  className?: string
}
export const Avatar = ({
  displayBadge = false,
  outline = false,
  src = 'images/avatar.jpg',
  className = ''
}: AvatarProps) => {
  return (
    <div className={`relative w-14 ${className}`}>
      <img src={src}
        className={`w-14 h-14 rounded-full bg-slate-50
          ${outline ? 'border-4 border-black' : ''}
        `}
        alt="avatar" />
      {displayBadge && (
        <img src='images/verified.png' alt="badge" className="absolute w-5 bottom-0 right-0" />
      )}
    </div>
  )
}
