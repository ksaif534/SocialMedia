import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Grid } from '@mui/material'

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
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <div style={{ justifyContent: 'center' }}>
                        {navbar}
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px', justifyContent: 'center' }}>
                        {profileCoverHeading}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfileLayout