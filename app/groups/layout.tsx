import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Grid } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

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
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <div style={{ justifyContent: 'center' }}>
                        {navbar}
                        {sidebar}
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default GroupsLayout