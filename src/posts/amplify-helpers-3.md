---
date: '2019-07-28'
title: AWS Amplify GraphQL Operations with TypeScript and Hooks - Part 3 [Mutations]
published: true
description:
tags: TypeScript, GraphQL, Amplify, JavaScript
series: AWS Amplify GraphQL Operations with TypeScript and Hooks
---

Let's take a quick look at mutations. This will be a short post, as Amplify makes mutations relatively painless, and the format of GraphQL mutations that we'll look at closely resemble the queries that we've already looked at (take a look at the previous posts in this series for more on that).

## Mutations

To set up for mutations, we need to look at part of the query we did in the previous section.

```typescript
const fetchQuery = async (query: string, variables?: VariablesType) => {
  try {
    setLoading(true)
    const { data } = (await API.graphql(
      graphqlOperation(query, variables),
    )) as {
      data: ResultType
    }
    setData(data)
  } catch (error) {
    console.log(error)
    setError(error)
  } finally {
    setLoading(false)
  }
}
```

All GraphQL API calls made with Amplify using the `graphqlOperation` function. We can reuse this, so let's make another function to handle the returning of data.

```typescript
export const gqlOp = async <
  ResultType extends {},
  VariablesType extends {} = {}
>(
  query: string,
  variables?: VariablesType,
) => {
  const { data } = (await API.graphql(graphqlOperation(query, variables))) as {
    data: ResultType
  }
  return data
}
```

Now we can use this little function in place of the fetch call.

```typescript
const fetchQuery = async (query: string, variables?: VariablesType) => {
  try {
    setLoading(true)
    const data = await gqlOp<ResultType, VariablesType>(query, variables)
    setData(data)
  } catch (error) {
    console.log(error)
    setError(error)
  } finally {
    setLoading(false)
  }
}
```

Now that's done, let's create a function for mutations.

```typescript
export const mutation = async <
  ResultType extends {},
  VariablesType extends {} = {}
>(
  query: string,
  variables?: VariablesType,
) => gqlOp<ResultType, VariablesType>(query, variables)
```

Alright, that's it. Thanks for reading!

Stay tuned for the next one where we tackle subscriptions.
