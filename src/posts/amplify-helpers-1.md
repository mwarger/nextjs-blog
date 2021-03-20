---
date: '2019-05-03'
title: AWS Amplify GraphQL Operations with TypeScript and Hooks - Part 1 [Queries]
published: true
description: Using Amplify to develop apps that use GraphQL is easy.  Using TypeScript along with GraphQL makes your components more dependable.  See what this looks like - with hooks!
tags: TypeScript, GraphQL, Amplify, JavaScript
series: AWS Amplify GraphQL Operations with TypeScript and Hooks
---

I'm a big fan of Amplify. I'm also a big fan of TypeScript. Amplify is not built with TypeScript, and to use it effectively, sometimes you need to give it a little help. This is especially true when it comes to GraphQL. With the advent of hooks, we can create some nice utilities for ourselves that let us leverage the power of TypeScript with our GraphQL queries. Let's see what that looks like.

##### > I'll be assuming familiarity with React and TypeScript, including the usage of Amplify and GraphQL for this post. There are tons of great resources online. Here's a [great set of steps](https://read.acloud.guru/8-steps-to-building-your-own-serverless-graphql-api-using-aws-amplify-42c21770424d) to setup a similar project. Or, you can clone the [sample app](https://github.com/mwarger/gamer-fi-typescript) and run `amplify init` at the root of the project to see the final result.

## Simple Query

From our [sample app](https://github.com/mwarger/gamer-fi-typescript) we have a list of popular games we want to retrieve. The query looks like this:

```graphql
popularGames {
    id
    name
    popularity
    url
    summary
    # ommitted for brevity
}
```

Starting out, this is a great first start to what we're going for. We want to use `useEffect` to handle fetching our data. We're using Amplify's `graphql` method and passing the GraphQL query from above to the `graphqlOperation` method.

```javascript
React.useEffect(() => {
  const fetchGames = async () => {
    try {
      const response = await API.graphql(graphqlOperation(popularGames))
    } catch (error) {
      console.log(error)
    }
  }

  fetchGames()
}, [])
```

The response objects has a data property, which contains our list of games. Here's a couple from the list.

```json
{
  "data": {
    "popularGames": [
      {
        "id": "76882",
        "name": "Sekiro: Shadows Die Twice",
        "popularity": 3954.25
      },
      {
        "id": "114455",
        "name": "Pacify",
        "popularity": 1472.0
      }
    ]
  }
}
```

We want to display these on our page, so we need to load them into state. With hooks, you accomplish this by creating a `useState` declaration and then using the method created for you to load them into state.

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

At this point, you could display your games on the page using the `gameData` object.

But in TypeScript land, we actually have more problems here. By initializing the state object to undefined, TypeScript can only infer that the value allowed for the `gameData` object is undefined, and will give us an error if we try to set our query response using the `setGameData` method. Additionally, there is a keyword we have used to get past this problem that bites many a first-time TypeScript developer in the ass.

`any`

This word will strike fear into the hearts of all who witness it. At least, it should if you want your future self to thank your past self at some point (Thanks, [Paul](https://twitter.com/paulweveritt?lang=en), for this great insight).

We don't want `any`s anywhere.

> We really want to try our best to give ourselves and our tools as much power as possible.

We can't tell what our data will be right now, which is a problem... but `Amplify` can help us.

## Types to the Rescue

In our project, if it's not configured already, we need to run `amplify configure codegen`. This will setup code generation and walk us through the process of generating types based on our queries. This is super helpful (and as far as I'm concerned, should be the default if a `.tsconfig` file is present at the root of the project...).

This gives us a type that we can use for our data. Normally, we could just throw this after the variable and be done with it.

```typescript
const response: { data: PopularGamesQuery } = await API.graphql(
  graphqlOperation(popularGames),
)
```

We know that response is going to be this type if the operation doesn't fail. However, the types returned by the `graphql` function are a mashup of `GraphQLResult` and `Observable` since this same function is used for both. Until this changes, we're going to let it know what we expect to get back. We can do this by using the `as` keyword to tell TypeScript what we know our type will be.

```typescript
const response = (await API.graphql(graphqlOperation(popularGames))) as {
  data: PopularGamesQuery
}
```

Now we get the type help that we want. Hovering over the `response` object confirms that TypeScript recognizes the response to be an object with a data property of type `PopularGamesQuery`.

## Games, setState

We'll use the same type to tell our `useState` function how we want to utilize our `gameData` object.

`useState` accepts a [generic type parameter](https://www.typescriptlang.org/docs/handbook/generics.html) that allows us to inform the function about the type we want to use.

```typescript
const [gameData, setGameData] = React.useState<PopularGamesQuery | undefined>(
  undefined,
)
```

Here, we have passed the same `PopularGamesQuery` type (as well as the possible undefined value we use to initialize it with). This consoles the TypeScript compiler and we can move forward with displaying our games.

As simple as this is, there are a few boilerplatey things that are staring us in the face. We can extract these things out and create some re-usable code that will make future queries in other components much easier to setup. Custom hooks to the rescue!

Stay tuned for the next post where we do just that!

> This post was originally posted on [my website](https://mw.codes/posts/amplify-ts-query-hook). You can see this and other articles like it, as well as what I'm all about. Follow me on [@twitter](https://twitter.com/mwarger) and reach out if you have any questions!
