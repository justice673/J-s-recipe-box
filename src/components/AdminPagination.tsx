'use client';

import React from 'react';

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function AdminPagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}: AdminPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(Math.max(1, currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(Math.min(totalPages, currentPage + 1));
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 border rounded-lg gap-4 ${className}`}>
      <div className="text-sm text-gray-700 font-outfit">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-outfit transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-outfit transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
