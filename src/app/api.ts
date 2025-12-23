import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({ query: () => 'posts' }),
    getPost: builder.query<any, number>({ query: (id) => `posts/${id}` }),
    getUsers: builder.query<any[], void>({ query: () => 'users' }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useGetUsersQuery } = api;