/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type Users = {
  userId: number
  id: number
  title: string
  body: string
}

// export const getServerSideProps = async () => {
//   const users = await fetch('https://jsonplaceholder.typicode.com/posts').then(
//     (res) => res.json(),
//   )

//   return { props: { users } }
// }

export default function NotesServerPage() {
  const [data, setData] = useState([])
  const [keyword, setKeyword] = useState('')

  const fetchingData = async ({ userId = '' }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts${
          userId ? `?userId=${userId}` : ''
        }`,
      ).then((res) => res.json())
      console.log('response => ', response)
      setData(response)
    } catch (error) {}
  }

  useEffect(() => {
    fetchingData({ userId: '' })
  }, [])

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button onClick={() => fetchingData({ userId: keyword })}>
          search
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((user: Users) => (
          <Link
            href={''}
            key={user.userId}
            className="p-4 bg-white shadow-sm rounded-lg"
          >
            <h1>{user.title}</h1>
            <p>{`user id: ${user.userId}`}</p>
            <p>{user.body}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
