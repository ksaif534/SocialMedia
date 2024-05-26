import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import RootHomeLayout from './root'

// const inter = Inter({ subsets: ['latin'] })

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
                <RootHomeLayout navsidebar={navsidebar} posts={posts} postInput={postInput} networkSidebar={networkSidebar} />
            </div>
        )
}

export default Layout