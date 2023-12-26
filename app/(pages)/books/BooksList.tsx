"use client"

import React from 'react';
import Image from 'next/image';

// Define a type for your book data
type Book = {
  title: string;
  isbn?: string;
  book_id: string;
  author: string;
};

// Define a type for the booksData prop
type BooksData = {
  read: Book[];
  'currently-reading': Book[];
  'to-read': Book[];
};

const BooksList = ({ booksData }: { booksData: BooksData }) => {
  // Function to construct the cover URL
  const getCoverUrl = (isbn: string, size: 'S' | 'M' | 'L' = 'L'): string => {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg?default=false`;
  };

  // Function to render each book section
  const renderBookSection = (sectionTitle: string, books: Book[]) => {
    return (
      <section aria-labelledby={`${sectionTitle.replace(/\s+/g, '-').toLowerCase()}-heading`}>
        <h2 id={`${sectionTitle.replace(/\s+/g, '-').toLowerCase()}-heading`} className="text-xl font-bold my-4">
          {sectionTitle}
        </h2>
        <div className="grid gap-8 px-5 sm:grid-cols-1 md:grid-cols-3 md:px-0">
          {books.map((book) => (
            <a
              key={book.book_id}
              className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10"
              href={`https://openlibrary.org/isbn/${book.isbn}`}
              aria-label={book.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {book.isbn && (
                
                <Image
                  src={getCoverUrl(book.isbn)}
                  alt={`Cover of ${book.title}`}
                  layout="intrinsic"
                  className="rounded-t-lg"
                  width={500}
                  height={500}
                />
                
              )}
              <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
                {book.title}
              </h3>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {book.author}
              </p>
            </a>
          ))}
        </div>
      </section>
    );
  };

  // Main component render
  return (
    <>
      {renderBookSection("Books I've Read", booksData.read)}
      {renderBookSection("Books I'm Currently Reading", booksData['currently-reading'])}
      {renderBookSection("Books I Want to Read", booksData['to-read'])}
    </>
  );
};

export default BooksList;