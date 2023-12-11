"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Search = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("query = ", query);
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://dayanand.vercel.app";

    const url = `${baseUrl}/api/users/search?query=${query}`;

    const response = await fetch(url);

    const data = await response.json();
    setUser(data);

    if (response.status !== 200 || data.users.length === 0) {
      toast.error("No user found");
    }

    console.log("data = ", data);
  };

  console.log("user = ", user);
  return (
    <div>
      <form onSubmit={handleSubmit} className="mr-6 flex">
        <input
          type="text"
          id="username"
          name="username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-lg
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search by college id"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        focus:outline-none ml-2 focus:shadow-outline "
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col">
        {user &&
          user.users?.map((item, key) => {
            return (
              <div
                key={key}
                className="flex flex-col max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
              >
                <div className="p-8 text-center">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {item.name}
                  </div>
                  <div className="block mt-2 text-base leading-tight font-medium text-black">
                    {item.email}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
