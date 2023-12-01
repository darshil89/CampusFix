import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma";
import Problem from "@/components/Problems/Problem";


// const getSpecificProblem = async (status) => {
//   const res = await fetch(
//     "http://localhost:3000/api/allProblems",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         status: status,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
    
    
//      { revalidate: 0 }
//   );

//   const data = await res.json();
//   return data;
// };

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;
  if (!session) redirect("/signin");
  const pending =  await prisma.problem.findMany({
    where: {
      status: "pending",
    },
  });
  const approved = await prisma.problem.findMany({
    where: {
      status: "approved",
    },
  });
  const rejected = await prisma.problem.findMany({
    where: {
      status: "rejected",
    },
  });
  if (session) {
    return (
      <>
        <div className="text-4xl mt-8 ml-4 mb-4 text-gray-700 font-semibold">
          Admin&apos;s Dashboard <span className="text-blue-500">Overview</span>
        </div>
        <div className="flex flex-row w-full">
          {/*Stats of the problems's in one line with boxes*/}
          <div className="sm:px-1 ml-4 flex flex-col w-100">
            <div className="bg-blue-300 rounded-lg p-5 shadow-2xl w-full relative ">
              <div className="text-gray-50 sm:text-lg text-2xl">
                Total Problems
              </div>
              <div className="text-gray-50  text-5xl ">
                {approved.length + pending.length + rejected.length}
              </div>
            </div>
            <div className="bg-blue-300 mt-4 rounded-lg p-5 shadow-2xl w-full relative ">
              <div className="text-gray-50 sm:text-lg text-2xl">
                Number of Approved Problems
              </div>
              <div className="text-gray-50  text-5xl ">{approved.length}</div>
            </div>
            <div className="bg-blue-300 mt-4 rounded-lg p-5 shadow-2xl w-full relative ">
              <div className="text-gray-50 sm:text-lg text-2xl">
                Number of Pending Problems
              </div>
              <div className="text-gray-50  text-5xl ">{pending.length}</div>
            </div>
            <div className="bg-blue-300  mt-4 rounded-lg p-5 shadow-2xl w-full relative ">
              <div className="text-gray-50 sm:text-lg text-2xl">
                Number of Rejected Problems
              </div>
              <div className="text-gray-50  text-5xl ">{rejected.length}</div>
            </div>
          </div>
          <div className="bg-gray-100 ml-5 rounded-lg">
            <Problem />
          </div>
        </div>
      </>
    );
  }
}
