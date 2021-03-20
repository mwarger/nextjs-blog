import Head from 'next/head'
import React from 'react'
import { Layout } from '../../layouts'
import { Date } from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import hydrate from 'next-mdx-remote/hydrate'
import Code from '../../components/Code'
import { MdxRemote } from 'next-mdx-remote/types'

const components = {
  code: Code,
  h1: (props: any) => <h1 className="text-xl font-semibold" {...props} />,
  h2: (props: any) => <h2 className="text-lg font-normal" {...props} />,
  // p: (props) => <p {...props} />,
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id)

  return {
    props: { postData },
  }
}

type MDXSourceType = {
  mdxSource: MdxRemote.Source
  frontMatter: {
    [key: string]: any
  }
}

export default function Post({
  postData: { mdxSource, frontMatter },
}: {
  postData: MDXSourceType
}) {
  const content = hydrate(mdxSource, { components })
  return (
    <Layout>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article className="prose-sm sm:prose lg:prose-lg">
        <h1 className="py-8 text-2xl font-bold text-center">
          {frontMatter.title}
        </h1>
        <div>
          <Date dateString={frontMatter.date} />
        </div>
        {content}
      </article>
    </Layout>
  )
}
