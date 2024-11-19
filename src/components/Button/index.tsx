interface ButtonProps {
  buttonText: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}

export default Button
