import React, { useState } from 'react'
import Button from '../Button'

interface Props {
  shortUrl: string
  originalUrl: string
  dateCreated?: string
}

const Card = ({ shortUrl, originalUrl, dateCreated }: Props) => {
  const [textToCopy, _] = useState(shortUrl)
  const [copyButtonText, setCopyButtonText] = useState('Copy')
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    setCopyButtonText('Copied!')
    setIsCopied(true)
    setTimeout(() => {
      setCopyButtonText('Copy')
      setIsCopied(false)
    }, 2000)
  }
  // Truncate long URLs for display
  const truncateUrl = (url: string, maxLength = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
  }

  return (
    <div className='rounded-lg bg-slate-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700'>
      <div className='flex flex-col md:flex-row md:items-center gap-4'>
        <div className='grow space-y-3'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
            <p className='text-xl font-medium'>
              <a
                href={shortUrl}
                className='text-sky-400 hover:text-sky-300 transition-colors break-all'
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl.split('/').pop()}
              </a>
            </p>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${isCopied ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
              {isCopied ? 'Copied to clipboard!' : 'Click button to copy'}
            </div>
          </div>
          <div className='bg-slate-900 p-3 rounded-md'>
            <p className='text-gray-300 text-sm break-all'>
              <span className='text-gray-500 mr-2'>Original:</span>
              <a
                href={originalUrl}
                className='hover:text-sky-400 transition-colors'
                target="_blank"
                rel="noopener noreferrer"
                title={originalUrl}
              >
                {truncateUrl(originalUrl)}
              </a>
            </p>
          </div>
          {dateCreated && (
            <div className='text-gray-400 text-sm'>
              <span className='mr-2'>Created:</span>
              <span>{dateCreated}</span>
            </div>
          )}
        </div>

        <div className='self-start md:self-center'>
          <Button
            buttonText={copyButtonText}
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
