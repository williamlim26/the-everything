import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { nanoid } from 'nanoid'
import Card from '@/components/Card'
import { GetServerSideProps } from 'next/types'
import { formatUnixTimestamp } from '@/utils/formatUnixTimeStamp'

interface Props {
  title: string
  baseUrl: string
}

interface Url {
  id?: string
  LongUrl: string
  ShortUrl: string
  length?: number
  createdAt?: number
}

/**
 * Simple Short URL
 *
 */
const ShortUrl = ({ title, baseUrl }: Props) => {
  const [longUrl, setLongUrl] = useState('')
  const [urls, setURLs] = useState<Url[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addItemToTable = async (newURL: Url) => {
    const response = await fetch('/api/aws/putItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newURL),
    })

    return response.json()
  }

  const handleSubmit = async () => {
    try {
      const newURL = {
        LongUrl: longUrl,
        ShortUrl: nanoid(8),
        createdAt: Math.floor(Date.now() / 1000),
      }
      setURLs([...urls, newURL])
      const response = await addItemToTable(newURL)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLongURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value)
  }

  const fetchItemsFromTable = async () => {
    const response = await fetch('/api/aws/fetchItems', {
      method: 'GET',
    })

    return response.json()
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchItemsFromTable()

      setURLs(response.Items)
    }
    fetchData()
  }, [])

  // const handleURLSearch = () => {
  //   const response =
  // }

  const handleCreateShortURL = () => {
    handleSubmit()
    setIsModalOpen(false)
  }

  return (
    <div className='mx-auto w-max mt-5'>
      <div className='pt-6 pb-6'>
        <div className='flex justify-between'>
          <h1 className='text-5xl'>{title}</h1>
          <Button
            /**
             * Button to open the modal for creating a new short URL.
             *
             * @prop buttonText - The text displayed on the button.
             * @prop onClick - Event handler that sets the modal visibility state to true.
             */
            buttonText='Create short url'
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='mt-5 mx-auto w-6/12 p-5 bg-cyan-800'>
            <div className='flex flex-col space-y-4'>
              <p className='text-2xl'>Create a short URL</p>
              <div className='flex items-center space-x-2'>
                <label className='text-lg'>Enter Long URL: </label>
                <input
                  name='myInput'
                  className='border border-gray-300 rounded-lg p-2 text-gray-900'
                  type='text'
                  placeholder='URL'
                  onChange={handleLongURLChange}
                />
              </div>
              <div className='flex justify-center'>
                <Button
                  buttonText='Create Short Url'
                  onClick={handleCreateShortURL}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col space-y-4'>
        {urls.map(({ id, ShortUrl, LongUrl, createdAt }) => (
          <Card
            key={id}
            shortUrl={`${baseUrl}/shortUrl/${ShortUrl}`}
            originalUrl={LongUrl}
            dateCreated={createdAt ? formatUnixTimestamp(createdAt) : ''}
          />
        ))}
      </div>
      {/* <div className='pt-5'>
        <Table title='cool' content={urls} />
      </div> */}
      {/* <div className='flex flex-col space-y-4'>
        <div className='flex items-center space-x-2'>
          <label className='text-2xl'>Enter Short URL: </label>
          <input
            name='myInput'
            className='border border-gray-300 rounded-lg p-2 text-gray-900'
            type='text'
            placeholder='URL'
            onChange={handleLongURLChange}
          />
        </div>
        <Button buttonText='Find URL' onClick={handleSubmit} />
      </div> */}
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers['host']
  const baseUrl = `${protocol}://${host}`

  return {
    props: {
      title: 'Short Url',
      baseUrl,
    },
  }
}

export default ShortUrl
