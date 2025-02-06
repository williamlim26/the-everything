import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleGenerate = async () => {
    const response = await fetch('/api/deepseek/sevenBBase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    })

    const data = await response.json()
    setOutput(data.output)
  }

  return (
    <div className='mx-auto max-w-screen-xl mt-5'>
      <h1>DeepSeek R1 Distill Qwen 1.5B</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter your input here'
      />
      <button onClick={handleGenerate}>Generate</button>
      <div>
        <h2>Output:</h2>
        <p>{output}</p>
      </div>
    </div>
  )
}
