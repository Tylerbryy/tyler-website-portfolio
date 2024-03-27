import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';

// TypeScript interfaces for props
interface Book {
  title: string;
  isbn?: string;
  book_id: string;
  author: string;
}

interface BooksData {
  read: Book[];
  'currently-reading': Book[];
  'to-read': Book[];
}

const getCoverUrl = (isbn: string, size: 'S' | 'M' | 'L' = 'L'): string =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg?default=false`;

const BooksList: React.FC<{ booksData: BooksData }> = ({ booksData }) => {
  const renderBookSection = useCallback((sectionTitle: string, books: Book[]) => {
    const sectionId = sectionTitle.replace(/\s+/g, '-').toLowerCase();

    return (
      <section aria-labelledby={`${sectionId}-heading`}>
        <h2 id={`${sectionId}-heading`} className="text-xl font-bold my-4">
          {sectionTitle}
        </h2>
        <div className="grid gap-8 px-5 sm:grid-cols-1 md:grid-cols-3 md:px-0">
          {books.map(book => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </div>
      </section>
    );
  }, []);

  const sectionData = useMemo(
    () => [
      { title: "Books I've Read", data: booksData.read },
      { title: "Books I'm Currently Reading", data: booksData['currently-reading'] },
      { title: "Books I Want to Read", data: booksData['to-read'] },
    ],
    [booksData]
  );

  return (
    <>
      {sectionData.map(({ title, data }) => renderBookSection(title, data))}
    </>
  );
};

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const coverUrl = useMemo(() => book.isbn ? getCoverUrl(book.isbn) : undefined, [book.isbn]);

  return (
    <div className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10">
      {coverUrl && (
        <a href={`https://openlibrary.org/isbn/${book.isbn}`} aria-label={book.title} target="_blank" rel="noopener noreferrer">
          <Image
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            layout="intrinsic"
            className="rounded-t-lg"
            width={500}
            height={500}
            loading="lazy"
          />
        </a>
      )}
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mt-4">{book.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
    </div>
  );
};

export default BooksList;