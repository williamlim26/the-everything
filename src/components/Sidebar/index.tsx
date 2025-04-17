import Link from "next/link"
import { useRouter } from "next/router"

interface Page {
  title: string
  path: string
}

interface Props {
  pages: Page[]
}

const Sidebar = ({ pages }: Props) => {
  const router = useRouter()
  
  return (
    <div className='relative flex flex-col h-screen bg-gradient-to-b bg-slate-800 text-white w-64 shadow-xl'>
      <div className='p-6 border-b border-blue-600'>
        <h1 className='font-sans text-3xl font-bold tracking-tight'>
          The Everything
        </h1>
      </div>
      
      <nav className='flex flex-col p-4 flex-grow'>
        {pages.map(({ title, path }: Page, index: number) => {
          const isActive = router.pathname === path
          
          return (
            <Link 
              key={`${title}-${index}`} 
              href={path}
              className={`
                flex items-center p-3 my-1 rounded-lg transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-blue-600 text-white font-medium shadow-md' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'}
              `}
            >
              <span className="ml-2 text-lg">{title}</span>
              {isActive && (
                <span className="ml-auto bg-blue-500 h-2 w-2 rounded-full"></span>
              )}
            </Link>
          )
        })}
      </nav>
      
      {/* <div className="p-4 border-t border-blue-600 mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold">
            U
          </div>
          <div className="ml-3">
            <p className="font-medium">User</p>
            <p className="text-xs text-blue-200">user@example.com</p>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Sidebar
