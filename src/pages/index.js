import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout';
import DefaultLayout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <DefaultLayout>
      <p>hello</p>
    </DefaultLayout>
   
  )
}
