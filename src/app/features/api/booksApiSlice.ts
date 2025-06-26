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
   
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
} = booksApiSlice;