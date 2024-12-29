import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RedirectShortUrl = () => {
  const router = useRouter()

  const { slug } = router.query

  useEffect(() => {
    const fetchRedirect = async () => {
      console.log('fetchRedirect:')
      try {
        const response = await fetch(`/api/aws/fetchItem?url=${slug}`, {
          method: 'GET',
        })
        // const data = await response.json()
        // window.location.href = data.longUrl // Redirect to the long URL
      } catch (error) {
        console.error('Error fetching short URL:', error)
      }
    }

    if (slug) {
      fetchRedirect()
    }
  }, [slug])

  return <>Redirecting...</>
}

export default RedirectShortUrl
