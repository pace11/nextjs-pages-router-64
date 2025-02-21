/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'

export default function TestApi() {
  const [notes, setNotes] = useState([])

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/notes').then((res) => res.json())

      setNotes(response.data)
    } catch (error) {
      console.log('Error')
    }
  }, [])

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('/api/notes').then((res) => res.json())

  //     setNotes(response.data)
  //   } catch (error) {
  //     console.log('Error')
  //   }
  // }

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const response = await fetch('/api/notes').then((res) => res.json())

    //     setNotes(response.data)
    //   } catch (error) {
    //     console.log('Error')
    //   }
    // }

    fetchData()
  }, [])

  return (
    <div>
      <ul>
        {notes?.map((el: { id: string; title: string }) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  )
}
