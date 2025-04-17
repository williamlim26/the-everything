# The Everything App

A multi-purpose Next.js application that combines several useful tools in one place, including a URL shortener, todo list manager, and an AI assistant interface.

**Live Demo:** [https://the-everything-will.vercel.app/](https://the-everything-will.vercel.app/)

![The Everything App Homepage](/public/images/homepage.png)

## Overview

The Everything App is designed to be a centralized platform for various productivity tools and utilities. It leverages Next.js for server-side rendering and AWS DynamoDB for data persistence, providing a seamless and responsive user experience.

You can access the live application at: [https://the-everything-will.vercel.app/](https://the-everything-will.vercel.app/)

## Features

- URL Shortener
- Todo List

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, pnpm, or bun
- AWS account (for DynamoDB features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/the-everything.git
cd the-everything
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Setup

For features that require AWS integration, you'll need to set up environment variables. Create a `.env.local` file in the root directory with the following variables:

```
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_REGION=your-region
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

## AWS Integration

### DynamoDB

The Everything App uses DynamoDB as the database for storing information, particularly for the URL shortener feature.

Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.

#### AWS SDK Libraries

- [client-dynamodb](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/) - DynamoDB Client provided by the AWS SDK for JavaScript, allows interaction with Amazon DynamoDB
- [lib-dynamodb](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-dynamodb/) - Provides higher-level abstractions and utilities for working with DynamoDB. Built on top of the `@aws-sdk/client-dynamodb`, offering simplified methods for common tasks.

**Key Differences Between client-dynamodb and lib-dynamodb**

| Feature              | `client-dynamodb`                                | `lib-dynamodb`                           |
| -------------------- | ------------------------------------------------ | ---------------------------------------- |
| **Marshalling**      | Manual: Use DynamoDB types like `{ S: "value" }` | Automatic: Pass native JS types directly |
| **Unmarshalling**    | Manual: Handle DynamoDB's raw format             | Automatic: Returns native JS objects     |
| **Ease of Use**      | More verbose, boilerplate-heavy                  | Simpler, cleaner code                    |
| **Batch Utilities**  | Requires custom logic for batching               | Simplified built-in methods              |
| **Target Use Cases** | Fine-grained control, custom logic               | Quick setup, less boilerplate            |

**Example: Using @aws-sdk/client-dynamodb (Low-Level)**

```javascript
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient()

const params = {
  TableName: 'MyTable',
  Item: {
    id: { S: '123' }, // Manual marshalling to DynamoDB format
    name: { S: 'John Doe' },
    age: { N: '30' },
  },
}

const command = new PutItemCommand(params)
await client.send(command)
```

**Example: Using @aws-sdk/lib-dynamodb (High-Level)**

```javascript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient()
const docClient = DynamoDBDocumentClient.from(client)

const params = {
  TableName: 'MyTable',
  Item: {
    id: '123', // Automatic marshalling
    name: 'John Doe',
    age: 30,
  },
}

const command = new PutCommand(params)
await docClient.send(command)
```

### AWS Security Details

To interact with DynamoDB in the app, you need:

- AWS_ACCESS_KEY_ID
- AWS_REGION
- AWS_SECRET_ACCESS_KEY

To set up these credentials:

1. Sign in to the AWS Management Console as the root user or an IAM user with sufficient permissions.
2. Go to the IAM Dashboard: In the AWS Management Console, search for "IAM" in the search bar and select IAM.
3. Create a new IAM user:
   - Click on Users in the left menu and then Add user.
   - Enter a User name and select the access type (e.g., Programmatic access to get the access key).
   - Assign the necessary permissions (e.g., AdministratorAccess or specific policies for your use case).
   - Download or copy the credentials: After creating the user, you'll see the Access key ID (`AWS_ACCESS_KEY_ID`) and Secret access key (`AWS_SECRET_ACCESS_KEY`). Copy the Secret access key and store it securely.

**Important**: The AWS_SECRET_ACCESS_KEY will only be shown once when you first create the credentials. After that, you won't be able to retrieve it again for security reasons. If you lose it, you will need to generate a new one.

### Setup AWS Environment Variables

General guide on setting up AWS Environment variables - https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-envvars.html

In this app, production environment variables are stored in the **Vercel Project's environment settings**.

For local development, create an `.env.local` and store the key values.
Add the file to `.gitignore` to avoid pushing credentials to Github:

```
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_REGION=your-region
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

### Create DynamoDB Table

Example of creating a DynamoDB table for the Reminder feature:

```javascript
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
