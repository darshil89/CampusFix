"use client";
import { AiOutlineUser } from "react-icons/ai";

import Link from "next/link";
const Problem = (props) => {
  console.log("props = ", props);
  const title = props.title;
  const content = props.content;
  const problemId = props.problemId;
  const userId = props.userId;
  console.log("problemId = ", problemId);
  console.log("userId = ", userId);
  console.log("title = ", title);
  console.log("content = ", content);
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100 w-1/2 ml-60">
        <li key={problemId} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <AiOutlineUser className="flex-shrink-0 w-10 h-10 rounded-full" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {title}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {content}
              </p>
            </div>
          </div>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded"
            href={`/allProblems/${problemId}`}
          >
            View
          </Link>
        </li>
        <div></div>
      </ul>
    </>
  );
};

export default Problem;
