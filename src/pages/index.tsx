import { Inter } from 'next/font/google'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const [mounted, setMounted] = useState(false);
  // Animation effect on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>The Everything App | Home</title>
        <meta name="description" content="Your all-in-one solution for productivity and organization" />
      </Head>
      <div className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <div className="relative overflow-hidden py-12 sm:py-20">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 opacity-50"></div>
          {/* Animated circles */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 right-40 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="relative max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              {/* Main heading with gradient text */}
              <h1 className="mt-4 text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Welcome
                </span>
              </h1>
              {/* Animated subtitle */}
              <div className="mt-6 overflow-hidden">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 animate-fade-in-up">
                  to The Everything App
                </p>
              </div>
              {/* Description */}
              <p className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 leading-relaxed">
                A playground for everyone to explore, create, and manage their digital life. From URL shortening to task management, we have it all.
              </p>
              {/* CTA Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shortUrl" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105">
                  Try URL Shortener
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="/todo" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-transparent border border-blue-600 rounded-lg hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                  Explore Todo App
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Feature highlights */}
        <div className="py-12 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl mt-16">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Discover What&apos;s Possible
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureItems.map((item, index) => (
                <div key={index} className="bg-slate-700 bg-opacity-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-3xl mb-4 text-blue-400">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Feature items with icons
const featureItems = [
  {
    icon: "🔗",
    title: "URL Shortener",
    description: "Create compact, shareable links for your long URLs with our powerful shortening tool."
  },
  {
    icon: "✅",
    title: "Todo List",
    description: "Stay organized with our intuitive task management system. Never miss a deadline again."
  },
  {
    icon: "🚀",
    title: "More Coming Soon",
    description: "We're constantly adding new features to make this truly The Everything App."
  }
];

// Animations are defined in globals.css

export default Home
