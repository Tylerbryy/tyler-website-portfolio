import React, { useMemo } from 'react';

// TypeScript interfaces for props
interface Book {
  title: string;
  book_id: string;
  author: string;
  date_read?: string; // Optional since not all books will have it
}

interface BooksData {
  read: Book[];
  'currently-reading': Book[];
  'to-read': Book[];
}

const BooksList: React.FC<{ booksData: BooksData }> = ({ booksData }) => {
  const sectionData = useMemo(() => [
    {
      title: "Books I've Read",
      data: booksData.read.sort((a, b) => {
        if (!a.date_read && !b.date_read) return 0;  // Both dates are missing, keep order unchanged
        if (!a.date_read) return 1;                 // a has no date, sort it to the bottom
        if (!b.date_read) return -1;                // b has no date, sort it to the bottom
        return b.date_read.localeCompare(a.date_read); // Compare dates in descending order
      })
    },
    { title: "Books I'm Currently Reading", data: booksData['currently-reading'] },
    { title: "Books I Want to Read", data: booksData['to-read'] },
  ], [booksData]);

  return (
    <>
      {sectionData.map(({ title, data }) => (
        <section key={title}>
          <h2 className="text-lg font-bold my-4">{title}</h2>
          <ul>
            {data.map(book => (
              <BookCard key={book.book_id} book={book} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const goodreadsUrl = `https://www.goodreads.com/book/show/${book.book_id}`;

  return (
    <li className="py-2">
      <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
        <div className="flex justify-between items-center">
          <div>
            <a href={goodreadsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline italic">
              {book.title}
            </a>
            <p className="text-xs">{book.author}</p>
          </div>
          {book.date_read && <span className="text-xs ml-4 italic">{book.date_read}</span>}
        </div>
      </div>
    </li>
  );
};

export default BooksList;
