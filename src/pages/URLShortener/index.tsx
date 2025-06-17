import React, { use, useEffect, useState } from 'react'
import Button from '@/components/Button'
import { nanoid } from 'nanoid'
import Card from '@/components/Card'
import { GetServerSideProps } from 'next/types'
import { formatUnixTimestamp } from '@/utils/formatUnixTimeStamp'
import Head from 'next/head'
import { LimitStatus } from '@/enums/api'

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

// URL validation regex pattern
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

/**
 * URL Shortener
 *
 */
const URLShortener = ({ title, baseUrl }: Props) => {
  const [longUrl, setLongUrl] = useState('')
  const [urls, setURLs] = useState<Url[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [urlError, setUrlError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [limitExceeded, setLimitExceeded] = useState(false)

  // useEffect(() => {
  //   const checkLimit = async () => {
  //     await fetch('/api/aws/checkLimit', {
  //       method: 'GET',
  //     })
  //   }
  //   const response = checkLimit()
  //   conolse.log('Limit check response:', response.json())
  // }, [])

  const addItemToTable = async (newURL: Url) => {
    try {
      const checkLimit = await fetch('/api/aws/checkLimit?limit=1', {
        method: 'GET',
      })

      const limitResponse = await checkLimit.json()
      if (limitResponse.status === LimitStatus.REJECTED) {
        setLimitExceeded(true)
        throw new Error('Daily limit exceeded. Please try again tomorrow.')
      }
      // const response = await fetch('/api/aws/putItem', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newURL),
      // })

      return limitResponse.json()
    } catch (error) {
      console.error('Error adding item to table:', error)
      throw error
    }
  }

  const handleSubmit = async () => {
    // Validate URL
    if (!URL_REGEX.test(longUrl)) {
      setUrlError('Please enter a valid URL')
      return
    }

    setUrlError('')
    setIsSubmitting(true)
    try {
      // Format URL if it doesn't have http/https
      // const formattedUrl = longUrl.startsWith('http')
      //   ? longUrl
      //   : `https://${longUrl}`
      const newURL = {
        LongUrl: longUrl,
        ShortUrl: nanoid(8),
        createdAt: Math.floor(Date.now() / 1000),
      }
      await addItemToTable(newURL)
      setURLs([newURL, ...urls])
      setLongUrl('')
      setIsModalOpen(false)
      // Show success message
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
      setIsModalOpen(false)
    }
  }

  const handleLongURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    // Clear error when user types
    if (urlError) setUrlError('')

    // Validate URL length (limit: 2048 characters)
    if (url.length > 2048) {
      setUrlError('URL exceeds maximum allowed length (2048 characters)')
    } else {
      // Validate URL format using the URL constructor and enforce https protocol
      try {
        const parsedUrl = new URL(url)
        if (parsedUrl.protocol !== 'https:') {
          setUrlError('URL must use https:// protocol')
        }
      } catch (error) {
        setUrlError('Invalid URL format')
      }
    }

    setLongUrl(url)
  }

  const fetchItemsFromTable = async () => {
    try {
      const response = await fetch('/api/aws/fetchItems', {
        method: 'GET',
      })

      return response.json()
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchItemsFromTable()
        setURLs(response.Items || [])
      } catch (error) {
        console.error('Failed to fetch URLs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCreateShortURL = () => {
    handleSubmit()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setUrlError('')
    setLongUrl('')
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Create and manage shortened URLs' />
      </Head>
      <div className='container mx-auto max-w-screen-xl px-4 py-8'>
        {/* Header */}
        <div className='mb-8 border-b border-gray-700 pb-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <h1 className='text-4xl md:text-5xl font-bold text-white'>
              {title}
            </h1>
            <Button
              buttonText='Create New URL'
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className='mb-6 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out'>
            <p className='font-medium'>
              Success! Your URL has been shortened and created.
            </p>
          </div>
        )}
        {/* URL Cards */}
        {isLoading ? (
          <div className='flex justify-center py-12'>
            <div className='animate-pulse text-xl'>Loading your URLs...</div>
          </div>
        ) : urls.length > 0 ? (
          <div className='grid gap-6'>
            {urls.map(({ id, ShortUrl, LongUrl, createdAt }) => (
              <Card
                key={id || ShortUrl}
                shortUrl={`${baseUrl}/shortUrl/${ShortUrl}`}
                originalUrl={LongUrl}
                dateCreated={createdAt ? formatUnixTimestamp(createdAt) : ''}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-12 bg-slate-800 rounded-lg'>
            <p className='text-xl text-gray-300'>
              No URLs yet. Create your first shortened URL!
            </p>
          </div>
        )}
      </div>

      {/* Create URL Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4'>
          <div className='bg-slate-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden'>
            {/* Modal Header */}
            <div className='flex justify-between items-center bg-slate-700 p-4 border-b border-slate-600'>
              <h2 className='text-xl font-semibold'>
                Create a New Shortened URL
              </h2>
              <button
                onClick={closeModal}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            {/* Modal Body */}
            <div className='p-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>
                    Enter Long URL
                  </label>
                  <input
                    name='longUrl'
                    className='w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white'
                    type='text'
                    placeholder='https://example.com/very-long-url'
                    value={longUrl}
                    onChange={handleLongURLChange}
                  />
                  {urlError && (
                    <p className='text-red-500 text-sm mt-1'>{urlError}</p>
                  )}
                  {limitExceeded && (
                    <p className='text-red-500 text-sm mt-1'>Daily limit Exceeded</p>
                  )}
                </div>
                <div className='pt-2'>
                  <Button
                    buttonText={isSubmitting ? 'Creating...' : 'Shorten URL'}
                    onClick={handleCreateShortURL}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers['host']
  const baseUrl = `${protocol}://${host}`

  return {
    props: {
      title: 'URL Shortener',
      baseUrl,
    },
  }
}

export default URLShortener
