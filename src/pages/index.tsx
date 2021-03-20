import Head from 'next/head'
import DarkModeToggle from '../components/dark-mode-toggle'
import { getSortedPostsData } from '../lib/posts'
import { Date } from '../components/date'
import Link from 'next/link'
import { Layout } from '../layouts'

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({
  allPostsData,
}: {
  allPostsData: { id: string; title: string; date: string }[]
}) {
  return (
    <Layout>
      <Head>
        <title>mw.codes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DarkModeToggle />

      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
