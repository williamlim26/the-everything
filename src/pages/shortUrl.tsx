import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { read } from 'fs'

interface Props {
  title: string
}

const ShortUrl: React.FC<Props> = ({ title }) => {
  const [longUrl, setLongUrl] = useState('')
  const [urls, setURLs] = useState([])

  const addItemToTable = async () => {
    const response = await fetch('/api/aws/putItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl }),
    })

    return response.json()
  }

  const handleSubmit = async () => {
    try {
      const response = await addItemToTable()
      console.log('response', response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLongURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value)
  }

  const readItemsFromTable = async () => {
    const response = await fetch('/api/aws/batchGetItem', {
      method: 'GET',
    })

    return response.json()
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await readItemsFromTable()

      setURLs(response)
    }
    fetchData()
  }, [])

  console.log('urls', urls)

  return (
    <div className='mx-auto max-w-screen-xl mt-5'>
      <div className='pt-6 pb-6'>
        <h1 className='text-5xl'>{title}</h1>
      </div>
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center space-x-2'>
          <label className='text-2xl'>Enter Long URL: </label>
          <input
            name='myInput'
            className='border border-gray-300 rounded-lg p-2 text-gray-900'
            type='text'
            placeholder='URL'
            onChange={handleLongURLChange}
          />
        </div>
        <Button buttonText='Create Short Url' onClick={handleSubmit} />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      title: 'Short Url',
    },
  }
}

export default ShortUrl
