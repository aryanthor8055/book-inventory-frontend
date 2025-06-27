import { useState } from 'react';
import { useGetBooksQuery } from '../features/api/booksApiSlice';
import BookDetails from './BookDetails';

export default function BookList() {
  const { data: books = [], isLoading, isError,refetch  } = useGetBooksQuery();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
  
  if (isError) return (
    <div className="text-center py-8 text-red-500">
      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="mt-2">Error loading books</p>
    </div>
  );

  return (
    <div>
      <BookDetails 
        book={selectedBook} 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        refetch={refetch}
      />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Recently Added</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.slice(0, 5).map((book) => (
            <div 
              key={book._id} 
              className="group relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer"
              onClick={() => {
                setSelectedBook(book);
                setIsDetailsOpen(true);
              }}
            >
              <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                {book.coverImageUrl ? (
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
          ))}
        </div>
      </section>

      {books.length > 5 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Your Collection ({books.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <div 
                key={book._id} 
                className="group relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer"
                onClick={() => {
                  setSelectedBook(book);
                  setIsDetailsOpen(true);
                }}
              >
                <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                  {book.coverImageUrl ? (
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
            ))}
          </div>
        </section>
      )}
    </div>
  );
}