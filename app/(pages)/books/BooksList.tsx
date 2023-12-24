import React from 'react';

// app/(pages)/books/BooksList.tsx
const BooksList = ({ booksData }) => {
  const renderBookSection = (sectionTitle, books) => {
    return (
      <section aria-labelledby={`${sectionTitle.replace(/\s+/g, '-').toLowerCase()}-heading`}>
        <h2 id={`${sectionTitle.replace(/\s+/g, '-').toLowerCase()}-heading`} className="text-xl font-bold my-4">
          {sectionTitle}
        </h2>
        <div className="grid gap-8 px-5 sm:grid-cols-1 md:grid-cols-3 md:px-0">
          {books.map((book) => (
            <a
              key={book.title}
              className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10"
              href={`https://www.goodreads.com/book/show/${book.book_id}`}
              aria-label={book.title}
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security for opening links in a new tab
            >
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

  return (
    <>
      {renderBookSection("Books I've Read", booksData.read)}
      {renderBookSection("Books I'm Currently Reading", booksData['currently-reading'])}
      {renderBookSection("Books I Want to Read", booksData['to-read'])}
    </>
  );
};

export default BooksList;