/* eslint-disable @next/next/no-img-element */
'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDeleteBookMutation } from '@/app/features/api/booksApiSlice'
import { toast } from 'react-toastify'

type Book = {
  _id: string
  title: string
  author: string
  coverImage?: string
  coverImageType?: string
  gradeLevel?: string
  subject?: string
  series?: string
}

export default function BookDetails({ 
  book, 
  isOpen, 
  onClose,
  refetch
}: {
  book: Book | null
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}) {
  const [deleteBook] = useDeleteBookMutation()

  const handleDelete = async () => {
    if (!book) return
    
    try {
      await deleteBook(book._id).unwrap()
      toast.success('Book deleted successfully')
      onClose()
      refetch()
    } catch (error) {
      toast.error('Failed to delete book')
      console.error('Delete error:', error)
    }
  }

  if (!book) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Book Details
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4">
                  {book.coverImage && (
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={book.coverImage}
                        alt={book.title}
                        className="h-48 object-contain rounded"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <h4 className="font-bold text-white text-xl">{book.title}</h4>
                      <p className="text-lg">by {book.author}</p>
                    </div>
                    
                    {book.gradeLevel && (
                      <div className="pt-2 border-t border-gray-700">
                        <span className="font-medium">Grade Level:</span> {book.gradeLevel}
                      </div>
                    )}
                    
                    {book.subject && (
                      <div>
                        <span className="font-medium">Subject:</span> {book.subject}
                      </div>
                    )}
                    
                    {book.series && (
                      <div>
                        <span className="font-medium">Series:</span> {book.series}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  >
                    Delete Book
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}