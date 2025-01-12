This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## DynamoDB
The-everything app's url shotener uses DynamoDB as the database choice to store all information.
Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.
- [client-dynamodb](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/), DynamoDB Client provided by the AWS SDK for JavaScript, allow interaction with Amazon DynamoDB
- [lib-dynamodb](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-dynamodb/) specifically designed to provide higher-level of abstractions and utilities working with DynamoDB.  It’s built on top of the `@aws-sdk/client-dynamodb`, offering simplified methods for common tasks, such as putting items, querying, scanning, and performing batch operations.

**Key Differences Between client-dynamodb and lib-dynamodb**

| Feature            | `client-dynamodb`                                    | `lib-dynamodb`                         |
|--------------------|------------------------------------------------------|----------------------------------------|
| **Marshalling**    | Manual: Use DynamoDB types like `{ S: "value" }`     | Automatic: Pass native JS types directly |
| **Unmarshalling**  | Manual: Handle DynamoDB's raw format                 | Automatic: Returns native JS objects   |
| **Ease of Use**    | More verbose, boilerplate-heavy                      | Simpler, cleaner code                  |
| **Batch Utilities**| Requires custom logic for batching                   | Simplified built-in methods            |
| **Target Use Cases**| Fine-grained control, custom logic                  | Quick setup, less boilerplate          |

**Example**
Using @aws-sdk/client-dynamodb (Low-Level)
```JS
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

const params = {
  TableName: "MyTable",
  Item: {
    id: { S: "123" }, // Manual marshalling to DynamoDB format
    name: { S: "John Doe" },
    age: { N: "30" },
  },
};

const command = new PutItemCommand(params);
await client.send(command);
```
Using @aws-sdk/lib-dynamodb (High-Level)
```JS
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const params = {
  TableName: "MyTable",
  Item: {
    id: "123", // Automatic marshalling
    name: "John Doe",
    age: 30,
  },
};

const command = new PutCommand(params);
await docClient.send(command);
```
## AWS Security Details
In order to interact with dynamodb in the app, we need
- AWS_ACCESS_KEY_ID
- AWS_REGION
- AWS_SECRET_ACCESS_KEY

Sign in to the AWS Management Console as the root user or an IAM user with sufficient permissions.

Go to the IAM Dashboard: In the AWS Management Console, search for "IAM" in the search bar and select IAM.

Create a new IAM user:
- Click on Users in the left menu and then Add user.
- Enter a User name and select the access type (e.g., Programmatic access to get the access key).
- Assign the necessary permissions (e.g., AdministratorAccess or specific policies for your use case).
- Download or copy the credentials: After creating the user, you'll see the Access key ID (`AWS_ACCESS_KEY_ID`) and Secret access key (`AWS_SECRET_ACCESS_KEY`). Copy the Secret access key and store it securely.

Important: The AWS_SECRET_ACCESS_KEY will only be shown once when you first create the credentials. After that, you won't be able to retrieve it again for security reasons. If you lose it, you will need to generate a new one.

## Setup AWS Environment Variables
General guide on setting up AWS Environment variables - https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-envvars.html

In this app, production environment variables are stored in the **Vercel Project's environment settings**.

For local development, create an `.env.local` and store the key values.
Add the file to `.gitignore` to avoid pushing credentials to Github
```JS
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_REGION=your-region
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

## Create DynamoDB Table
```
const client = new DynamoDBClient({})
const command = new CreateTableCommand({
  TableName: 'Reminder',
  // For more information about data types,
  // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
  // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html
  AttributeDefinitions: [
    {
      AttributeName: 'Id',
      AttributeType: 'S',
    },
    {
      AttributeName: 'Item',
      AttributeType: 'S',
    },
  ],
  // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-table-keyschema.html
  KeySchema: [
    {
      AttributeName: 'Id',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'Item',
      KeyType: 'RANGE',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
})

const response = await client.send(command)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
