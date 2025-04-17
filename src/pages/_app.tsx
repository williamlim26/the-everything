import "@/styles/globals.css";
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

const pages = [
  // { title: 'Can I help you?', path: '/assistant' },
  { title: 'Home', path: '/' },
  { title: 'URL Shortener', path: '/URLShortener' },
  { title: 'To-do List', path: '/todo' },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout pages={pages}>
      <Component {...pageProps} />
    </Layout>
  )
}
