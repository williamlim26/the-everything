import { TrashIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface Props {
  title: string
}

interface Reminder {
  Id: string
  Item: string
  completed: boolean
  createdAt: number
}

const Todo = ({ title }: Props) => {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [newReminderText, setNewReminderText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Delete a reminder
  const deleteReminder = async (id: string, item: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/aws/deleteReminder', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, item }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete reminder')
      }

      // Update local state
      setReminders(reminders.filter((reminder) => !(reminder.Id === id && reminder.Item === item)))
      setError('')
    } catch (err) {
      console.error('Error deleting reminder:', err)
      setError('Failed to delete reminder. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle reminder completed state
  const toggleReminderCompleted = async (id: string, item: string, completed: boolean) => {
    try {
      // setIsLoading(true)
      const response = await fetch('/api/aws/updateReminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, item, completed: !completed }),
      })

      if (!response.ok) {
        throw new Error('Failed to update reminder')
      }

      // Update local state
      setReminders(
        reminders.map((reminder) =>
          reminder.Id === id
            ? { ...reminder, completed: !reminder.completed }
            : reminder
        )
      )
      setError('')
    } catch (err) {
      console.error('Error updating reminder:', err)
      setError('Failed to update reminder. Please try again.')
    }
  }

  // Debug state changes
  useEffect(() => {
    console.log('Current input value:', newReminderText)
  }, [newReminderText])

  // Fetch reminders
  const fetchReminders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/aws/fetchReminders')
      const data = await response.json()

      if (data.Items) {
        setReminders(data.Items)
      }
      setError('')
    } catch (err) {
      console.error('Error fetching reminders:', err)
      setError('Failed to load reminders. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Add a new reminder
  const addReminder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newReminderText.trim()) return

    try {
      setIsLoading(true)
      const response = await fetch('/api/aws/addReminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newReminderText }),
      })

      if (!response.ok) {
        throw new Error('Failed to add reminder')
      }

      const data = await response.json()
      setReminders([...reminders, data.reminder])

      // Reset the form
      setNewReminderText('')
      const form = e.target as HTMLFormElement
      form.reset()
      setError('')
    } catch (err) {
      console.error('Error adding reminder:', err)
      setError('Failed to add reminder. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Load reminders on component mount
  useEffect(() => {
    fetchReminders()
  }, [])

  return (
    <div className='mx-auto max-w-screen-xl mt-5'>
      <div className='space-y-8'>
        <h1 className='text-5xl font-bold text-white'>{title}</h1>

        {/* Add new reminder form */}
        <form onSubmit={addReminder} className='flex gap-2'>
          <input
            type='text'
            defaultValue=''
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setNewReminderText(e.currentTarget.value)
            }
            placeholder='Add a new reminder...'
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white'
          />
          <button
            type='submit'
            disabled={isLoading || !newReminderText.trim()}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors'
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className='p-4 bg-red-100 text-red-700 rounded-lg'>{error}</div>
        )}

        {/* Ongoing Reminders list */}
        <p className='text-4xl'>My List</p>
        <div className='space-y-4'>
          {isLoading && reminders.length === 0 ? (
            <p className='text-gray-500'>Loading reminders...</p>
          ) : reminders.length === 0 ? (
            <p className='text-gray-500'>No reminders yet. Add one above!</p>
          ) : (
            <ul className='divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden'>
              {reminders.filter((reminder) => !reminder.completed).map((reminder) => (
                <li key={reminder.Id} className='p-4 bg-white hover:bg-gray-50'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={reminder.completed}
                      onChange={() =>
                        toggleReminderCompleted(
                          reminder.Id,
                          reminder.Item,
                          reminder.completed
                        )
                      }
                      className='h-5 w-5 text-blue-600 rounded mr-3 focus:ring-blue-500'
                    />
                    <span
                      className={`flex-1 ${
                        reminder.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-900'
                      }`}
                    >
                      {reminder.Item}
                    </span>
                    <span className='text-sm text-gray-500 mr-3'>
                      {new Date(reminder.createdAt * 1000).toLocaleString()}
                    </span>
                    <button
                      onClick={() => deleteReminder(reminder.Id, reminder.Item)}
                      className='text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors'
                      title='Delete reminder'
                    >
                      <TrashIcon className='h-5 w-5' />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Reminders list */}
        <p className='text-4xl'>Completed</p>
        <ul className='divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden'>
          {reminders.filter((reminder) => reminder.completed).map((reminder) => (
            <li key={reminder.Id} className='p-4 bg-white hover:bg-gray-50'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={reminder.completed}
                  onChange={() =>
                    toggleReminderCompleted(
                      reminder.Id,
                      reminder.Item,
                      reminder.completed
                    )
                  }
                  className='h-5 w-5 text-blue-600 rounded mr-3 focus:ring-blue-500'
                />
                <span
                  className={`flex-1 ${
                    reminder.completed
                      ? 'line-through text-gray-500'
                      : 'text-gray-900'
                  }`}
                >
                  {reminder.Item}
                </span>
                <span className='text-sm text-gray-500 mr-3'>
                  {new Date(reminder.createdAt * 1000).toLocaleString()}
                </span>
                <button
                  onClick={() => deleteReminder(reminder.Id, reminder.Item)}
                  className='text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors'
                  title='Delete reminder'
                >
                  <TrashIcon className='h-5 w-5' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  // const client = new DynamoDBClient({})
  // const command = new CreateTableCommand({
  //   TableName: 'Reminder',
  //   // For more information about data types,
  //   // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html
  //   AttributeDefinitions: [
  //     {
  //       AttributeName: 'Id',
  //       AttributeType: 'S',
  //     },
  //     {
  //       AttributeName: 'Item',
  //       AttributeType: 'S',
  //     },
  //   ],
  //   // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-table-keyschema.html
  //   KeySchema: [
  //     {
  //       AttributeName: 'Id',
  //       KeyType: 'HASH',
  //     },
  //     {
  //       AttributeName: 'Item',
  //       KeyType: 'RANGE',
  //     },
  //   ],
  //   ProvisionedThroughput: {
  //     ReadCapacityUnits: 1,
  //     WriteCapacityUnits: 1,
  //   },
  // })

  // const response = await client.send(command)
  // console.log(response)

  return {
    props: {
      title: 'To-do list',
    },
  }
}

export default Todo
