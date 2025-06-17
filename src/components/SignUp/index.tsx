import { useState } from 'react'

interface SignUpProps {
  title: string
  description: string
  open: boolean
  closeModal: (open: boolean) => void
}

const SignUp: React.FC<SignUpProps> = ({
  title,
  open,
  description,
  closeModal,
}) => {
  const [emailInput, setEmailInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value

    if (email.length > 100) {
      setErrorMsg('Email exceeds maximum allowed length (100 characters)')
    } else {
      setEmailInput(email)
      setErrorMsg('')
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4'>
      <div className='bg-white rounded-lg w-full max-w-md overflow-hidden p-8 space-y-7'>
        {/* Header */}
        <div className='space-y-2'>
          <div className='flex justify-between bg-white'>
            <h1 className='text-2xl font-bold text-black'>{title}</h1>
            <button
              onClick={() => closeModal(false)}
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
          <p className='text-gray-600'>{description}</p>
        </div>
        {/* Body */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-600'>
            Email
          </label>
          <input
            name='longUrl'
            className='w-full px-4 py-2 bg-white border border-slate-600 rounded-lg focus:ring-2 focus:bg-gray-100 focus:ring-blue-500 focus:border-blue-500 text-black'
            type='text'
            value={emailInput}
            onChange={handleEmailInput}
          />
          <p className='text-red-700'>{errorMsg}</p>
        </div>
        <button className='bg-gray-600 p-2 rounded-lg w-full hover:bg-gray-800 hover:text-gray-200'>
          Submit
        </button>
      </div>
    </div>
  )
}

export default SignUp
