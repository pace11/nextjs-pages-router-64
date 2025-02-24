import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useRouter } from 'next/router'

const formSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi !'),
  description: z.string().min(1, 'Description wajib diisi !'),
})

type FormNotes = z.infer<typeof formSchema>

export default function NotesServerCreate() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNotes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   setIsLoading(true)
  //   setError(null)

  //   try {
  //     const response = await fetch('/api/notes/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     })

  //     if (!response.ok) {
  //       const data = await response.json()
  //       setError(data)
  //       return
  //     }

  //     const data = await response.json()
  //     if (data.success) {
  //       router.push('/notes/server')
  //     }
  //   } catch (error) {
  //     console.error('An unexpected error happened:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const onSubmit: SubmitHandler<FormNotes> = async (data) => {
    try {
      const response = await fetch('/api/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const submitPayload = await response.json()
      if (submitPayload.success) {
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
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            {...register('title')}
            placeholder="Input title ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {errors && typeof errors === 'object' && (
            <small className="text-red-500">{errors.title?.message}</small>
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
            {...register('description')}
            placeholder="Input description ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {errors && typeof errors === 'object' && (
            <small className="text-red-500">
              {errors.description?.message}
            </small>
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
