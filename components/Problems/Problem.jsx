"use client";
import { AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import Link from "next/link";
const Problem = (props) => {
  // console.log("props = ", props);
  const title = props.title;
  const status = props.status;
  const content = props.content;
  const problemId = props.problemId;
  const userId = props.userId;
  const name = props.name;

  const handlerApprove = async (problemId) => {
    try {
      const response = await fetch("http://localhost:3000/api/allProblems", {
        method: "PUT",
        body: JSON.stringify({
          problemId: problemId,
          status: "approved",
        }),
      });
      if (response.ok) {
        toast.success("Problem Approved");
      } else {
        toast.error("Problem not approved");
      }
    } catch (error) {
      console.log("error in updating = ", error);
    }
  };

  const handlerReject = async (problemId) => {
    try {
      const response = await fetch("http://localhost:3000/api/allProblems", {
        method: "PUT",
        body: JSON.stringify({
          problemId: problemId,
          status: "rejected",
        }),
      });
      if (response.ok) {
        toast.success("Problem Rejected");
      } else {
        toast.error("Problem not rejected");
      }
    } catch (error) {
      console.log("error in updating = ", error);
    }
  };

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
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={() => handlerApprove(problemId)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handlerReject(problemId)}
            >
              Reject
            </button>
          </div>
        </li>
        <div></div>
      </ul>
    </>
  );
};

export default Problem;
