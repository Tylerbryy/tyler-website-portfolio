// app/(pages)/books/page.tsx
import React from 'react';
import BooksList from './BooksList';
import booksData from 'data/books.json';
import Balancer from "react-wrap-balancer";

const BooksPage: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <div className="absolute -top-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-20% via-white/5 to-white to-80% dark:from-slate-800 dark:from-20% dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-10% via-white/5 to-white to-90% dark:from-slate-800 dark:from-10% dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>
          <h1 className="mx-auto text-center font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            <Balancer>Books</Balancer>
          </h1>
          <span className="block text-center text-lg leading-8 text-slate-600 dark:text-slate-400">
            <Balancer>A collection of books I've read, am reading, and want to read.</Balancer>
          </span>
        </div>
        <div className="relative mx-auto max-w-3xl px-6">
          <BooksList booksData={booksData} />
        </div>
      </div>
    </>
  );
};

export default BooksPage;