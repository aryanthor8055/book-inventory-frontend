/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { Book } from '@/app/types/book';
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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={formik.handleSubmit}>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {processing ? (
            <p>Processing image...</p>
          ) : formik.values.coverImageUrl ? (
            <div className="flex flex-col items-center">
              <img
                src={formik.values.coverImageUrl}
                alt="Book cover preview"
                className="h-32 object-contain mb-2"
              />
              <p className="text-sm text-gray-600">Click or drag to replace</p>
            </div>
          ) : (
            <p>Drag & drop book cover image here, or click to select</p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
            <input
              type="text"
              name="gradeLevel"
              value={formik.values.gradeLevel}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Series</label>
            <input
              type="text"
              name="series"
              value={formik.values.series}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}