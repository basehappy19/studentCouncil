'use client'
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a function to update URL with new page number
  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => updatePage(1)}
        disabled={isFirstPage}
        aria-label="First Page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => updatePage(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {generatePageNumbers().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          className={`transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${page === currentPage ? 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400' : 'bg-gray-300 hover:bg-gray-500 focus:ring-gray-400'}`}
          onClick={() => updatePage(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => updatePage(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next Page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => updatePage(totalPages)}
        disabled={isLastPage}
        aria-label="Last Page"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;