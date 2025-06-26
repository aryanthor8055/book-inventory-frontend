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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Book Inventory Builder</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <BookForm onSuccess={() => toast.success('Book added successfully')} />
          </div>
          <div className="lg:col-span-2">
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Search books..."
                className="w-full p-2 border rounded"
              />
            </div>
            {isSearching ? (
              <div className="text-center py-8">Searching books...</div>
            ) : searchResults ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Search Results ({searchResults.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((book) => (
                    <div key={book._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        {book.coverImageUrl && (
                          <div className="flex-shrink-0">
                            <img
                              src={book.coverImageUrl}
                              alt={`Cover of ${book.title}`}
                              className="h-24 object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">{book.title}</h3>
                          <p className="text-sm text-gray-600">{book.author}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <BookList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}