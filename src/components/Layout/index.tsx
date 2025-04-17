import React, { ReactNode } from "react"
import Sidebar from "../Sidebar"

interface Page {
  title: string
  path: string
}

interface Props {
  children: ReactNode
  pages: Page[]
}

const Layout = ({ children, pages }: Props) => {
  return (
    <div className='flex min-h-screen bg-slate-900'>
      <Sidebar pages={pages} />
      <main className='flex-1 p-8 overflow-auto'>
        <div className='max-w-7xl mx-auto'>{children}</div>
      </main>
    </div>
  )
}

export default Layout
