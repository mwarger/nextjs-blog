---
date: '2019-06-19'
title: AWS Amplify GraphQL Operations with TypeScript and Hooks - Part 2 [Custom Hooks]
published: true
description: Custom Hooks allow you to extract commonly used functionality away to be used in multiple parts of your app. In the last post, we talked about what it looks like to leverage hooks and the Amplify library with TypeScript to fetch some data. There were some common elements involved with this, so let's make our data fetching more useful by extracting a custom hook we can use whenever we want to query our API.
tags: aws-amplify, TypeScript, GraphQL, react
series: AWS Amplify GraphQL Operations with TypeScript and Hooks
---

Custom Hooks allow you to extract commonly used functionality away to be used in multiple parts of your app. In the last post, we talked about what it looks like to leverage hooks and the Amplify library with TypeScript to fetch some data. There were some common elements involved with this, so let's make our data fetching more useful by extracting a custom hook we can use whenever we want to query our API.

## The Hook:

Here is the code we left with from the previous post:

```typescript
const [gameData, setGameData] = React.useState(undefined)

React.useEffect(() => {
  const fetchGames = async () => {
    try {
      const response: any = await API.graphql(graphqlOperation(popularGames))
      setGameData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  fetchGames()
}, [])
```

Let's take this and put it inside a custom hook called `useQuery`. We need to rename the return values from our `useState` call because we're not specifically talking about game stuff, we're making a re-usable hook.

The result is below:

```typescript
const useQuery = () => {
  const [data, setData] = React.useState(undefined)

  React.useEffect(() => {
    const fetchQuery = async () => {
      try {
        const response: any = await API.graphql(graphqlOperation(popularGames))
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchQuery()
  }, [])
}
```

Wait, that doesn't look like anything. It's just a function.

_Exactly._

Hooks are functions that we can use to encapsulate and compose other hooks that we want to leverage in our code.

## Passing arguments

There are some things that we need to generalize to be able to re-use this function elsewhere. Namely, the `popularGames` query and any possible variables (this example doesn't have any, but we want to accommodate other queries that may).

We can accomplish this by passing arguments into the hook just like any other function.

```typescript
const useQuery = (query: string, variables?: any) => {
  const [data, setData] = React.useState(undefined)

  React.useEffect(() => {
    const fetchQuery = async () => {
      try {
        const response: any = await API.graphql(graphqlOperation(query))
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchQuery()
  }, [query, variables])
}
```

We've done a few things here, including adding two new arguments (`query` and `variables`), adding them to the dependency array for the `useEffect` declaration, and updating the `graphqlOperation` to take the `query`.

However, in doing this we've lost any help provided to us by the types that we were using in the previous post's example. We need to fix that - but how?

## Generics

Generics allow us to pass types to functions, in a similar way to passing arguments to functions. In this case, we want to pass generic type arguments to our `useQuery` hook to give it information about what types our `query` and `variables` are.

It looks like this:

```typescript
const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType,
) => {
  const [data, setData] = React.useState({} as ResultType)

  React.useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = (await API.graphql(
          graphqlOperation(query, variables),
        )) as {
          data: ResultType
        }

        setData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchQuery()
  }, [query])
}
```

Here, we are saying that we can pass two types to our `useQuery` hook. The first type is the `ResultsType` we are going to have returned from our network call. The second is the `VariablesType` that we can use if we want to pass variables to our Amplify query call. We default this to an empty object by putting `= {}` after the declaration. We use this type after the optional `variables` declaration for our function.

## Returning Data

You may have noticed that we are not returning anything from this hook. We are fetching data and that data is set to the state within the hook - but that's it. We can return whatever we want from this hook, like our data, and we can also return helpful information like whether we're currently loading the data or have encountered an error. We can add some state to keep track of these and also return an object holding our different pieces of state. It looks like this:

```typescript
type UseQueryType<ResultType> = {
  loading: boolean
  error: any
  data: ResultType
  refetch: () => void
}

export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType,
): UseQueryType<ResultType> => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState({} as ResultType)

  const fetchQuery = async (query: string, variables?: VariablesType) => {
    try {
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

  React.useEffect(() => {
    fetchQuery(query, variables)
  }, [query])

  return {
    loading,
    data,
    error,
  }
}
```

We're going to initialize the loading state to true, set the error to an empty string, and then return all our stateful parts in an object to the client. The last thing we'd like to do is set the return type for the function, and we can make use of generics again to create another type that encapsulates the different parts of the state.

The type will look like this:

```typescript
type UseQueryType<ResultType> = {
  loading: boolean
  error: any
  data: ResultType
}
```

We can use it by declaring the return type after the hook, like this:

```typescript
export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType
): UseQueryType<ResultType> => {
  ...
```

## Adding Convenience

Just as a convenience, we're going to add a function to our hook that we can pass back to the consumers of our hook that will let us re-fetch the data (maybe to refresh a list manually if we choose). I've added that ability here:

```typescript
type UseQueryType<ResultType> = {
  loading: boolean
  error: any
  data: ResultType
  refetch: () => void
}

export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType,
): UseQueryType<ResultType> => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState({} as ResultType)

  const fetchQuery = async (query: string, variables?: VariablesType) => {
    try {
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

  const refetch = () => {
    fetchQuery(query, variables)
  }

  React.useEffect(() => {
    fetchQuery(query, variables)
  }, [query])

  return {
    loading,
    data,
    error,
    refetch,
  }
}
```

Nice, mmkay - this is a pretty fun hook that takes a lot of boilerplate off our tray. You can give this a try in an app, and it will fetch the data just fine. But, if you run it in the latest version of create-react-app, you will see a warning about hook dependencies. The problem is that for our `useEffect` hook, we're providing the `query` argument, but not the `variables` that we also use within the hook. What this means is that if the variables change, the effect will not re-run and we will have incorrectly run the `graphqlOperation` with stale variables.

We can fix this by adding variables to the dependency array.

```typescript
React.useEffect(() => {
  fetchQuery(query, variables)
}, [query, variables])
```

But if you run this, you will end up with the hooks infinitely looping over and over! Why is this? `variables` is an object, and for dependencies that are an object, we need to compare their properties, which React does not do by default. We could write this ability ourselves. But luckily, [Kent Dodds already has](https://github.com/kentcdodds/use-deep-compare-effect).

Install this by running `npm i use-deep-compare-effect` (or `yarn add use-deep-compare-effect`).

Next, we need to update our `useEffect` call to use this instead.

First, import it:

```typescript
import useDeepCompareEffect from 'use-deep-compare-effect'
```

and replace the call to `useEffect`:

```typescript
useDeepCompareEffect(() => {
  fetchQuery(query, variables)
}, [query, variables])
```

Now, your objects will be compared using deep equality and the infinite loops will be a thing of the past.

## Wrapping Up

The final iteration of this particular demonstration is below. I hope this helps explain some different aspects of hooks when working with Amplify, GraphQL, and TypeScript. Follow me on [twitter](https://twitter.com/mwarger) and let me know if you found it helpful or if you had any problems!

```typescript
type UseQueryType<ResultType> = {
  loading: boolean
  error: any
  data: ResultType
  refetch: () => void
}

export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType,
): UseQueryType<ResultType> => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState({} as ResultType)

  const fetchQuery = async (query: string, variables?: VariablesType) => {
    try {
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

  const refetch = () => {
    fetchQuery(query, variables)
  }

  useDeepCompareEffect(() => {
    fetchQuery(query, variables)
  }, [query, variables])

  return {
    loading,
    data,
    error,
    refetch,
  }
}
```

> This post was originally posted on [my website](https://mw.codes/posts/amplify-ts-query-custom-hook). You can see this and other articles like it, as well as what I'm all about. Follow me on [@twitter](https://twitter.com/mwarger) and reach out if you have any questions!
