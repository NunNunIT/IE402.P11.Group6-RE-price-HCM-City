import React from "react";
import Link from "next/link"; // Import Link from Next.js

interface NewCardProps {
  news: {
    _id: string;
    title: string;
    content: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
  };
  getUsername: (userId: string) => string;
}

const NewCard: React.FC<NewCardProps> = ({ news, getUsername }) => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-bold">{news.title}</h2>
        <p className="text-sm text-gray-600">
          Published by:{" "}
          <span className="font-medium text-gray-800">
            {getUsername(news.owner)}
          </span>
        </p>
        <p className="mt-2 text-gray-600">{news.content.slice(0, 120)}...</p>
        <Link
          href={`/news/${news._id}`}
          className="text-blue-600 hover:underline block mt-2"
        >
          Read more
        </Link>
      </div>

      <footer className="px-4 py-2 bg-gray-100">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(news.updatedAt).toLocaleDateString()}
        </p>
      </footer>
    </article>
  );
};

export default NewCard;
