import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Grid } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SK Social',
  description: 'Social Media App',
}

const Layout = (
    { 
    children,
    navsidebar, 
    posts, 
    postInput,  
    networkSidebar
} 
    : 
{ 
    children: React.ReactNode, 
    navsidebar: React.ReactNode,
    posts: React.ReactNode, 
    postInput: React.ReactNode, 
    networkSidebar: React.ReactNode
}
    ) => {
        return (
            <div>
                {children}
                <Grid container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                        {navsidebar}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={2} sm={12} xs={12}>

                    </Grid>
                    <Grid item md={7} sm={12} xs={12}>
                        <div style={{ marginTop: '5rem', marginBottom: '1rem' }}>
                            {postInput}
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            {posts}
                        </div>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <div style={{ marginTop: '5rem', marginBottom: '1rem' }}>
                            {networkSidebar}
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
}

export default Layout