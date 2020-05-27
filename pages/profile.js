import useSWR from 'swr'
import fetch from 'node-fetch'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Profile() {
  const { data, error } = useSWR(
    'https://dev.to/api/users/by_username?url=mwarger',
    fetcher
  )

  if (error) return <div>Error</div>
  if (!data) return <div>loading...</div>
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>[You can find me on twitter/dev.to/github ]</p>
        <a href="https://dev.to/mwarger">
          <img
            src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
            alt="Mat Warger's DEV Profile"
            height="30"
            width="30"
          />
        </a>
      </section>
    </Layout>
  )
}
