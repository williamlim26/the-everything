// import { useEffect } from 'react'
import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

interface Props {
  title: string
}

const ShortUrl: React.FC<Props> = ({ title }) => {
  return (
    <div className='mx-auto max-w-screen-xl mt-5'>
      <div className='space-y-5'>
        <h1 className='text-5xl'>{title}</h1>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const client = new DynamoDBClient({})
  const docClient = DynamoDBDocumentClient.from(client)

  //https://us-east-1.console.aws.amazon.com/dynamodbv2/home?region=us-east-1#item-explorer?maximize=true&operation=SCAN&table=Testing1
  const command = new PutCommand({
    TableName: 'Testing1',
    Item: {
      Id: 'wqfwefw',
      ShortUrl: 'fnsalfvlwf',
      LongUrl: 'fwefwwefgwefewfewfwfwefwefweffew',
      length: 27,
    },
  })

  // const response = await docClient.send(command)
  // console.log(response)
  // return response

  const response = await client.send(command)
  console.log(response)
  // return response
  return {
    props: {
      title: 'Short Url',
    },
  }
}

export default ShortUrl
