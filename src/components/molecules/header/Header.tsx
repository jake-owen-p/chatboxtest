import { PropsWithChildren } from 'react'
import Image from 'next/image'
import {
  RectangleStackIcon,
  ChartBarIcon,
  StarIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

const HeaderButtonContainer = ({ children }: PropsWithChildren) => (
  <div className="bg-white rounded-full inline-block p-2 cursor-pointer">
    {children}
  </div>
)

const navItems = [
  { icon: RectangleStackIcon, label: 'Product' },
  { icon: ChartBarIcon, label: 'Benefits' },
  { icon: StarIcon, label: 'Testimonials' },
  { icon: UserIcon, label: 'Use Cases' },
  { icon: QuestionMarkCircleIcon, label: 'FAQ' },
  { icon: BookOpenIcon, label: 'Our Blog' },
]

export const Header = () => {
  return (
    <div className="mt-4 w-full flex justify-between items-center bg-[#394E3D] p-3 rounded-full">
      <HeaderButtonContainer>
        <div >
            <Image src="/logo.png" alt="logo" width={90} height={20} />
        </div>
      </HeaderButtonContainer>

      <nav className="hidden lg:flex space-x-6">
        {navItems.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex items-center space-x-2 text-[#C4CEC4] text-sm font-sm hover:opacity-80"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <HeaderButtonContainer>
        <Image src="/burger-menu.svg" alt="menu" width={20} height={20} />
      </HeaderButtonContainer>
    </div>
  )
}
