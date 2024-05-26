import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Grid } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SK Social',
    description: 'Social Media App',
}

const ProfileCreateLayout = ({
    children,
    profileCreate
}: {
    children: React.ReactNode,
    profileCreate: React.ReactNode
}) => {
    return (
        <div>
            {children}
            <Grid container spacing={2}>
                <Grid item md={2} sm={2} xs={12}>

                </Grid>
                <Grid item md={8} sm={8} xs={12}>
                    { profileCreate }
                </Grid>
                <Grid item md={2} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfileCreateLayout