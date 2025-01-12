import React, { useState } from 'react'
import Button from '../Button'

interface Props {
  shortUrl: string
  originalUrl: string
  dateCreated?: string
}

const Card = ({ shortUrl, originalUrl, dateCreated }: Props) => {
  const [textToCopy, _] = useState(shortUrl)
  const [copyButtonText, setCopyButtonText] = useState('copy')

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    setCopyButtonText('Copied')
    setTimeout(() => {
      setCopyButtonText('copy')
    }, 2000)
  }
  return (
    <div className='rounded bg-slate-800 p-8'>
      <div className='flex flex-row space-x-1'>
        <div className='grow space-y-2'>
          <p className='text-xl'>
            <a href={shortUrl} className='text-sky-400'>
              {shortUrl}
            </a>
          </p>
          <div>
            <p>{originalUrl}</p>
          </div>
          {dateCreated !== '' && (
            <div className='pt-2'>
              <p>{dateCreated}</p>
            </div>
          )}
        </div>

        <Button buttonText={copyButtonText} onClick={handleCopy}></Button>
      </div>
    </div>
  )
}

export default Card
