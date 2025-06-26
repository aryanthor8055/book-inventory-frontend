import { useGetBooksQuery } from '../features/api/booksApiSlice';

export default function BookList() {
  const { data: books = [], isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <div className="text-center py-8">Loading books...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading books</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Book Inventory ({books.length})</h2>
      {books.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No books found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
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
                  {book.gradeLevel && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Grade:</span> {book.gradeLevel}
                    </p>
                  )}
                  {book.subject && (
                    <p className="text-sm">
                      <span className="font-medium">Subject:</span> {book.subject}
                    </p>
                  )}
                  {book.series && (
                    <p className="text-sm">
                      <span className="font-medium">Series:</span> {book.series}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}