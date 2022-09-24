import { Icon } from 'components/atoms/Icon'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link to='/'><Icon fillColor='#fff' src="images/logo.svg" width={50} height={50} /></Link>
  )
}
