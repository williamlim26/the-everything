import { Inter } from 'next/font/google'
import Link from 'next/link'

interface Props {
  pages: Page[]
}
interface Page {
  title: string
  path: string
}

const Home: React.FC<Props> = ({ pages }) => {
  return (
    <div className='mx-auto max-w-screen-xl mt-5'>
      <div className='space-y-5'>
        <h1 className='text-5xl'>Dashboard</h1>
        <div className='grid grid-cols-2 gap-4'>
          {pages.map(({ title, path }: Page, index: number) => (
            <Link key={`${title}-${index}`} className='text-2xl' href={path}>
              <div className='bg-gray-200 text-black p-4 rounded-lg'>
                <h2 className='text-2xl'>{title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const pages = [
    { title: 'Can I help you?', path: '/assistant' },
    { title: 'Short URL', path: '/shortUrl' },
    { title: 'To-do list', path: '/todo' },
    { title: 'Coming 3', path: '/' },
  ]

  return {
    props: {
      pages,
    },
  }
}
