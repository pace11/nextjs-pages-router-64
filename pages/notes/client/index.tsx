import useSWR from 'swr'
import { useRouter } from 'next/router'

type ListNotes = {
  id: string
  title: string
  description: string
  deleted_at: string
  created_at: string
  updated_at: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NoteClientPage() {
  const router = useRouter()
  const { data, isLoading, error } = useSWR(
    'https://service.pace-unv.cloud/api/notes',
    fetcher,
    {
      //   revalidateOnFocus: true,
      refreshInterval: 3000,
    },
  )

  console.log('error', error)

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error...</div>

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.data?.map((note: ListNotes) => (
        <div key={note.id} className="p-4 bg-white shadow-sm rounded-lg">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button
            onClick={() =>
              router.push({
                pathname: `/notes/client/edit/${note.id}`,
                query: {
                  title: note.title,
                  description: note.description,
                },
              })
            }
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  )
}
