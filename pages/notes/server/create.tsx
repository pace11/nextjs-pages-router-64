import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function NotesServerCreate() {
  const router = useRouter()
  const [payload, setPayload] = useState<{
    title: string
    description: string
  }>({
    title: '',
    description: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<{
    errors: { [key: string]: string }
  } | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data)
        return
      }

      const data = await response.json()
      if (data.success) {
        router.push('/notes/server')
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Note</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={payload.title}
            onChange={(event) =>
              setPayload({ ...payload, title: event.target.value })
            }
            placeholder="Input title ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error && typeof error === 'object' && error.errors && (
            <small className="text-red-500">{error.errors.title}</small>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={payload.description}
            onChange={(event) =>
              setPayload({ ...payload, description: event.target.value })
            }
            placeholder="Input description ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error && typeof error === 'object' && error.errors && (
            <small className="text-red-500">{error.errors.description}</small>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
