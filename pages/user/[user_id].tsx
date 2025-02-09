import { useRouter } from 'next/router'

export default function User() {
  const router = useRouter()

  return <div>User: {router.query.user_id} </div>
}
