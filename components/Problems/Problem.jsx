"use client";
import { AiOutlineUser } from "react-icons/ai";

import Link from "next/link";
const Problem = (props) => {
  console.log("props = ", props);
  const title = props.title;
  const status = props.status;
  const content = props.content;
  const problemId = props.problemId;
  const userId = props.userId;
  const name = props.name;
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
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                by-{name}
              </p>
              <p>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {status}
                </span>
              </p>
            </div>
          </div>
          <div>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              href={`/allProblems/${problemId}`}
            >
              View
            </Link>
            <Link
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
              href={`/allProblems/${problemId}`}
            >
              Approve
            </Link>
            <Link
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              href={`/allProblems/${problemId}`}
            >
              Reject
            </Link>
          </div>
        </li>
        <div></div>
      </ul>
    </>
  );
};

export default Problem;
