/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import BookList from '@/app/components/BookList';
import BookForm from '@/app/components/BookForm';
import { useLazySearchBooksQuery } from '@/app/features/api/booksApiSlice';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearch, { data: searchResults, isFetching: isSearching }] = useLazySearchBooksQuery();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      triggerSearch(query);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gradient-to-b from-black to-transparent py-4 px-4 lg:px-8 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">BookFlix</h1>
          <div className="relative w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="Search books..."
              className="w-full bg-gray-800 text-white p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <svg
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-10 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:h-screen lg:overflow-y-auto">
            <BookForm onSuccess={() => toast.success('Book added successfully')} />
          </div>

        
          <div className="lg:col-span-3">
            {isSearching ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              </div>
            ) : searchResults ? (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6">Search Results ({searchResults.length})</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>
              </section>
            ) : (
              <BookList />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const BookCard = ({ book }: { book: any }) => (
  <div className="group relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10">
    <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
      {book?.coverImageUrl ? (
        <img
          src={book.coverImageUrl}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
          <span>No Cover</span>
        </div>
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
      <div>
        <h3 className="font-bold text-white truncate">{book.title}</h3>
        <p className="text-sm text-gray-300 truncate">{book.author}</p>
      </div>
    </div>
  </div>
);