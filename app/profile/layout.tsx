import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ProfileRootLayout from './root'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SK Social',
  description: 'Social Media App',
}

const ProfileLayout = ({
    children,
    navbar,
    profileCoverHeading,
    profileBody
} : {
    children: React.ReactNode,
    navbar: React.ReactNode,
    profileCoverHeading: React.ReactNode,
    profileBody: React.ReactNode
}) => {
    return (
        <div>
            { children }
            <ProfileRootLayout navbar={navbar} profileCoverHeading={profileCoverHeading} profileBody={profileBody} />
        </div>
    )
}

export default ProfileLayout