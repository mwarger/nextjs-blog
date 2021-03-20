import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import Code from '../components/Code'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    } as { id: string; date: string; title: string }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

const components = {
  code: Code,
  // h1: (props) => <h1 tw="text-xl font-semibold" {...props} />,
  // h2: (props) => <h2 tw="text-lg font-normal" {...props} />,
  // p: (props) => <p {...props} />,
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const { content, data } = matter(fileContents)

  const mdx = await renderToString(content, { components, scope: data })

  // Combine the data with the id
  return {
    mdxSource: mdx,
    frontMatter: data,
  }
}

// export async function getSortedPostsData() {
//   const res = await fetch('https://dev.to/api/articles?username=mwarger')
//   const allPostsData = await res.json()
//   console.log('json', allPostsData)
//   // Get file names under /posts

//   // Sort posts by date
//   return allPostsData.sort((a, b) => {
//     if (a.published_timestamp < b.published_timestamp) {
//       return 1
//     } else {
//       return -1
//     }
//   })
// }
