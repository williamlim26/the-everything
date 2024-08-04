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

  // const command = new CreateTableCommand({
  //   TableName: 'Testing1',
  //   // For more information about data types,
  //   // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html
  //   AttributeDefinitions: [
  //     {
  //       AttributeName: 'Id',
  //       AttributeType: 'S',
  //     },
  //     // {
  //     //   AttributeName: 'ShortUrl',
  //     //   AttributeType: 'S',
  //     // },
  //     {
  //       AttributeName: 'longUrl',
  //       AttributeType: 'S',
  //     },
  //   ],
  //   // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-table-keyschema.html
  //   KeySchema: [
  //     {
  //       AttributeName: 'Id',
  //       KeyType: 'HASH',
  //     },
  //     // {
  //     //   AttributeName: 'ShortUrl',
  //     //   KeyType: 'RANGE',
  //     // },
  //     {
  //       AttributeName: 'longUrl',
  //       KeyType: 'RANGE',
  //     },
  //   ],
  //   ProvisionedThroughput: {
  //     ReadCapacityUnits: 1,
  //     WriteCapacityUnits: 1,
  //   },
  // })

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
      title: 'ShortUrl',
    },
  }
}

export default ShortUrl
