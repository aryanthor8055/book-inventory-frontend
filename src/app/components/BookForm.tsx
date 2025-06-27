'use client'
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { useAddBookMutation, useProcessBookImageMutation } from '../features/api/booksApiSlice';

interface BookFormProps {
  onSuccess?: () => void;
}

export default function BookForm({ onSuccess }: BookFormProps) {
  const [processing, setProcessing] = useState(false);
  const [addBook] = useAddBookMutation();
  const [processBookImage] = useProcessBookImageMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      gradeLevel: '',
      subject: '',
      series: '',
      coverImageUrl: '',
    },
    onSubmit: async (values) => {
      try {
        await addBook(values).unwrap();
        formik.resetForm();
        onSuccess?.();
      } catch (error) {
        alert('Failed to add book');
      }
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        try {
          setProcessing(true);
          const formData = new FormData();
          formData.append('image', acceptedFiles[0]);
          
          const result = await processBookImage(formData).unwrap();
          
          formik.setValues({
            ...formik.values,
            title: result.data?.title || '',
            author: result.data?.author || '',
            series: result.data?.series || '',
            coverImageUrl: URL.createObjectURL(acceptedFiles[0])
          });
        } catch (error) {
          alert('Failed to process image. Please try again or enter details manually.');
        } finally {
          setProcessing(false);
        }
      }
    }
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Add New Book</h2>
      <form onSubmit={formik.handleSubmit} className="max-h-[80vh] overflow-y-auto pr-2">
        {/* Custom scrollbar styling */}
        <style jsx>{`
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: #374151;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #6B7280;
            border-radius: 3px;
          }
        `}</style>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-red-600 bg-red-900/20' 
              : formik.values.coverImageUrl 
                ? 'border-gray-600 hover:border-red-600' 
                : 'border-gray-600 hover:border-red-600 bg-gray-700/50'
          }`}
        >
          <input {...getInputProps()} />
          {processing ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-2"></div>
              <p className="text-gray-300">Processing image...</p>
            </div>
          ) : formik.values.coverImageUrl ? (
            <div className="flex flex-col items-center">
              <img
                src={formik.values.coverImageUrl}
                alt="Book cover preview"
                className="h-32 object-contain mb-2 rounded"
              />
              <p className="text-sm text-gray-400">Click or drag to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <svg className="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>Drag & drop book cover here</p>
              <p className="text-sm mt-1">or click to select</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Grade Level</label>
            <input
              type="text"
              name="gradeLevel"
              value={formik.values.gradeLevel}
              onChange={formik.handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Series</label>
            <input
              type="text"
              name="series"
              value={formik.values.series}
              onChange={formik.handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors font-medium mb-4"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}