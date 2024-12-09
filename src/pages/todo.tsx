import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

interface Props {
  title: string;
}

const Todo: React.FC<Props> = ({ title }) => {
  return (
    <div className="mx-auto max-w-screen-xl mt-5">
      <div className="space-y-5">
        <h1 className="text-5xl">{title}</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const client = new DynamoDBClient({});
  const command = new CreateTableCommand({
    TableName: "Reminder",
    // For more information about data types,
    // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html
    AttributeDefinitions: [
      {
        AttributeName: "Id",
        AttributeType: "S",
      },
      {
        AttributeName: "Item",
        AttributeType: "S",
      },
    ],
    // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-table-keyschema.html
    KeySchema: [
      {
        AttributeName: "Id",
        KeyType: "HASH",
      },
      {
        AttributeName: "Item",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);
  console.log(response);
  return {
    props: {
      title: "To-do list",
    },
  };
};

export default Todo;
