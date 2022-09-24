import {
  Link
} from 'react-router-dom'

import { Logo } from 'components/atoms/Logo'
import { Text } from 'components/atoms/Text'
import { Avatar } from 'components/atoms/Avatar'

export const Header = () => {
  return (
    <section className='w-full flex flex-1 justify-between items-center px-10 py-6'>
      <div className='flex flex-row justify-center items-center space-x-2'>
        <Logo />
        <div className='pl-10 space-x-14'>
          <Text type='regular' className='inline-block'>
            <Link to="/">Explore</Link>
          </Text>
          <Text type='regular' className='inline-block'>
            <Link to="/algo" className='inline-block text-white'>Algorithm</Link>
          </Text>
        </div>
      </div>
          <Avatar />
     </section>
  )
}
