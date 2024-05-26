import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SK Social',
    description: 'Social Media App',
}

const LoginLayout = ({
    children,
    custom
} : {
children: React.ReactNode,
custom: React.ReactNode
}) => {
return (
    <div>
        {children}
        {custom}
    </div>
)
}

export default LoginLayout