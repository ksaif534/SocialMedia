import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import RootGroupLayout from './root'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SK Social',
  description: 'Social Media App',
}

const GroupsLayout = ({
    children,
    navbar,
    sidebar
} : {
    children: React.ReactNode,
    navbar: React.ReactNode,
    sidebar: React.ReactNode
}) => {
    return (
        <>
            { children }
            <RootGroupLayout navbar={navbar} sidebar={sidebar} />
        </>
    )
}

export default GroupsLayout