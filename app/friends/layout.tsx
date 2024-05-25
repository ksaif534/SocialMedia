import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SK Social',
  description: 'Social Media App',
}

const FriendsLayout = ({
    children,
    friendCard
} : {
    children: React.ReactNode,
    friendCard: React.ReactNode
}) => {
    return (
        <div>
            { children }
            { friendCard }
        </div>
    )
}

export default FriendsLayout