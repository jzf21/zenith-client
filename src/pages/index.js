import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout';
import DefaultLayout from '@/components/Layout';
import Createroom from '@/components/Huddle/Createroom';
import MeetRoom from './_meetroom';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <DefaultLayout>
        <p>hellp</p>
        <p>hellp</p>
        <Createroom />
      </DefaultLayout>
    </div>
  );
}
