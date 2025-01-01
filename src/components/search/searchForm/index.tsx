import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchFormProps {
  onSubmit: (__e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[100%] sm:w-[80%] lg:w-[50%] max-w-lg"
    >
      <div className="relative">
        {/* Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <CiSearch className="w-4 h-4 text-gray-500 " />
        </div>
        {/* Input */}
        <input
          type="search"
          id="search-param"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Tìm bài đăng theo tên hoặc mã ..."
          required
        />
        {/* Button */}
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          <CiSearch className="w-4 h-4 text-white " />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
