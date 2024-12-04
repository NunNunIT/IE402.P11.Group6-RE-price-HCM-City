"use client"; // Add this line to mark the file as a Client Component

import React, { useState } from "react";
import newsData from "../../../content/news"; // News articles data
import usersData from "../../../content/users"; // Users data
import NewCard from "./components/NewCard"; // NewCard component

const NewsPage = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Helper function to fetch the username from usersData based on user ID
  const getUsername = (userId: string): string => {
    const user = usersData.find((user) => user._id === userId);
    return user ? user.username : "Unknown User";
  };

  // Calculate total pages
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  // Slice newsData to show only the items for the current page
  const paginatedNews = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper function to generate page numbers with ellipsis
  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    const pages: (string | number)[] = [];
    const maxVisibleButtons = 7; // The total number of page buttons to show (including ellipses)
    const placeholderCount = 3; // The number of invisible placeholders ($)

    // Add invisible placeholders at the beginning if needed
    let leadingPlaceholders = Math.max(
      0,
      Math.floor((maxVisibleButtons - 1) / 2) - (currentPage - 1)
    );
    let trailingPlaceholders = Math.max(
      0,
      Math.floor((maxVisibleButtons - 1) / 2) - (totalPages - currentPage)
    );

    // Push invisible placeholders (not visible but maintain layout)
    pages.push(...Array(leadingPlaceholders).fill("$"));

    // Always include the first page
    pages.push(1);

    // Add ellipses before the current page if needed
    if (currentPage > 3) pages.push("...");

    // Add the current page and its neighbors
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    // Add ellipses after the current page if needed
    if (currentPage < totalPages - 2) pages.push("...");

    // Always include the last page
    pages.push(totalPages);

    // Add trailing invisible placeholders
    pages.push(...Array(trailingPlaceholders).fill("$"));

    return pages;
  };

  // Handle page click
  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Real Estate News</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedNews.map((news) => (
          <NewCard key={news._id} news={news} getUsername={getUsername} />
        ))}
      </main>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 items-center gap-2">
        {generatePageNumbers(currentPage, totalPages).map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === "..." || page === "$"}
            className={`px-3 py-2 rounded-lg border ${
              currentPage === page
                ? "bg-blue-800 text-white border-blue-800"
                : "bg-white text-blue-600 border-gray-300"
            } ${
              (page === "..." || page === "$") &&
              "cursor-default border-transparent"
            } ${page !== "..." && page !== "$" && "hover:border-blue-600"}`}
            style={{
              minWidth: "2.5  rem", // Ensure consistent button size
              textAlign: "center",
            }}
          >
            {page !== "$" ? page : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
