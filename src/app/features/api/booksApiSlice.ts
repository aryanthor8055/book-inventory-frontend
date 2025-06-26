import { apiSlice } from './apiSlice';
import { Book } from '@/app/types/book';

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    processBookImage: builder.mutation<Book, FormData>({
      query: (formData) => ({
        url: '/books/process-image',
        method: 'POST',
        body: formData,
      }),
    }),
    searchBooks: builder.query<Book[], string>({
      query: (query) => `/books/search?query=${query}`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useProcessBookImageMutation,
  useLazySearchBooksQuery,
} = booksApiSlice;