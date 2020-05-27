import useSWR from 'swr'
import fetch from 'node-fetch'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Profile() {
  const { data, error } = useSWR(
    'https://dev.to/api/users/by_username?url=mwarger',
    fetcher
  )

  if (error) return <div>Error</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
