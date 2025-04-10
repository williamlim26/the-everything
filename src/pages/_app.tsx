import "@/styles/globals.css";
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

const pages = [
  { title: 'Can I help you?', path: '/assistant' },
  { title: 'Short URL', path: '/shortUrl' },
  { title: 'To-do list', path: '/todo' },
  { title: 'Home', path: '/' },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout pages={pages}>
      <Component {...pageProps} />
    </Layout>
  )
}
