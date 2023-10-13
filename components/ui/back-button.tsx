"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center rounded-full bg-gradient-to-t from-gray-100 via-gray-50 to-white px-4 py-1.5 text-slate-500 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-t dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-gradient-to-br dark:hover:from-slate-800 dark:hover:via-slate-700 dark:hover:to-slate-600 dark:active:ring-white/20"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </button>
  );
};

export default BackButton;
