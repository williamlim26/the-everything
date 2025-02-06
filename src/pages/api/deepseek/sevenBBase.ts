import { pipeline } from '@huggingface/transformers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }

  // Download the Ollama
  // Run ollama run deepseek-r1:1.5b
  // Run ollama serve in local to spin up the LLM

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-r1:1.5b',
        streaming: true,
        messages: [{ role: 'user', content: 'why is the sky blue?' }],
      }),
    })

    // Check if the response is a stream
    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('No readable stream in response')
    }

    const decoder = new TextDecoder('utf-8')
    // let result = ''

    // Read the streaming response
    let assistantResponse = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const result = decoder.decode(value)
      const {
        message: { content },
      } = JSON.parse(result)
      assistantResponse += content
    }

    console.log('Streamed response:', assistantResponse)

    res.status(200).json({ output: assistantResponse })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Error processing request' })
  }
}
