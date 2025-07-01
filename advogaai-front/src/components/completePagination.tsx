'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="hover:bg-zinc-200"
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i < 3) {
            // Exibe páginas 1 a 3
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (i === 3) {
            // Adiciona reticências
            return (
              <PaginationItem key="ellipsis">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          if (i === totalPages - 1) {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return null;
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
