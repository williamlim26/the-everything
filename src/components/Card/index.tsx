interface Props {
  shortUrl: string
  destination: string
}

const Card = ({ shortUrl, destination }: Props) => {
  return (
    <div className='rounded bg-slate-800 border-4 border-slate-600 p-4'>
      <div className='grid gap-3'>
        <div>
          <p className='text-xl'>
            <a href={shortUrl} className='text-sky-400'>
              {shortUrl}
            </a>
          </p>
        </div>
        <div>
          <p>{destination}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
