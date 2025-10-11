import React from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <ReactPaginate
        previousLabel={
          <div className="flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </div>
        }
        nextLabel={
          <div className="flex items-center gap-1">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        }
        pageCount={totalPages}
        onPageChange={onPageChange}
        forcePage={currentPage}
        containerClassName={'flex items-center space-x-2'}
        pageClassName={'mx-1'}
        pageLinkClassName={'px-4 py-2 border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 transition-colors duration-200'}
        previousClassName={'mx-1'}
        previousLinkClassName={'px-4 py-2 border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 transition-colors duration-200 font-semibold'}
        nextClassName={'mx-1'}
        nextLinkClassName={'px-4 py-2 border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 transition-colors duration-200 font-semibold'}
        activeClassName={'active'}
        activeLinkClassName={'!bg-green-600 !text-white !border-green-600'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
        breakLabel={'...'}
        breakClassName={'mx-1'}
        breakLinkClassName={'px-4 py-2 text-gray-500'}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
      />
    </div>
  );
}
