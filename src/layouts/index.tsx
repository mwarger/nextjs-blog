import React from 'react'
import {NextSeo} from 'next-seo'

export function Layout({
  children,
  meta,
}: {
  children: React.ReactNode
  meta?: any
}) {
  const {title, description, titleAppendSiteName = false, url, ogImage} =
    meta || {}
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={titleAppendSiteName ? undefined : '%s'}
        openGraph={{
          title,
          description,
          url,
          images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
      />
      <div className="max-w-screen-md mx-auto mt-0 leading-6 prose dark:prose-dark md:dark:prose-xl-dark md:prose-xl">
        {title && <h1 className="text-xl leading-tight">{title}</h1>}
        {children}
      </div>
    </>
  )
}
