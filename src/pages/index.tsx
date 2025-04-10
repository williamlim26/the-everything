import { Inter } from 'next/font/google'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='max-w-screen-xl mt-5'>
      <div className='flex flex-row space-x-5'>
        <div className='grow'>
          <h1 className='text-5xl'>Welcome</h1>
        </div>
      </div>
    </div>
  )
}

export default Home

// No getServerSideProps needed since pages are defined in _app.tsx
