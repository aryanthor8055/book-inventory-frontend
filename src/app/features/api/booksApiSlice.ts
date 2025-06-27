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
    processBookImage: builder.mutation<{
      success: boolean;
      data: Partial<Book>;
      bookId?: string;
    }, FormData>({
      query: (formData) => ({
        url: '/books/process-image',
        method: 'POST',
        body: formData,
      }),
    }),
    searchBooks: builder.query<Book[], string>({
      query: (query) => `/books/search?query=${query}`,
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useProcessBookImageMutation,
  useLazySearchBooksQuery,
} = booksApiSlice;