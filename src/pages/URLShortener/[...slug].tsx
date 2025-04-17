import { GetServerSideProps } from 'next'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'

const RedirectShortUrl = () => {
  return <>Redirecting...</>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {}

  if (!slug) {
    return {
      notFound: true,
    }
  }

  try {
    const client = new DynamoDBClient({})
    const docClient = DynamoDBDocumentClient.from(client)

    const command = new GetCommand({
      TableName: 'Testing1',
      Key: {
        Id: slug[0],
        ShortUrl: slug[0],
      },
    })
    const response = await docClient.send(command)

    if (response?.Item?.LongUrl) {
      return {
        redirect: {
          destination: response.Item.LongUrl,
          permanent: true,
        },
      }
    }

    return {
      notFound: true,
    }
  } catch (error) {
    console.error('Error fetching short URL:', error)

    return {
      notFound: true,
    }
  }
}

export default RedirectShortUrl
