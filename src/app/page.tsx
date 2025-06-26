'use client';
import BookList from '@/app/components/BookList';
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Book Inventory Builder</h1>
      

       <BookList/>
      </div>
    </div>
  );
}