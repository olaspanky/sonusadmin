import { Inter } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import { Providers } from './store/provider'
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import UserPool from './UserPool';


Amplify.configure({ ...awsExports, ssr: true });


import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const sans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
})
 

export const metadata = {
  title: 'Pbr Life Sciences',
  description: 'Pbr Life Sciences',
}



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={sans.className}>

      <Providers>
      {children}
        </Providers>
        
        </body>
    </html>
  )
}
