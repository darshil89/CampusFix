import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Problem from "@/components/Problems/Problem";

const getallProblems = async () => {
  const response = await fetch("http://localhost:3000/api/allProblems", {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();
  // console.log("data = ", data);
  return data;
};

const getSpecificProblem = async (status) => {
  // console.log("status = ", status);
  const res = await fetch("http://localhost:3000/api/allProblems", {
    method: "POST",
    body: JSON.stringify({
      status: status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export default async function AdminDashboard() {
  const problems = await getallProblems();

  const spefificProblem = await getSpecificProblem("pending");
  // console.log("spefificProblem = ", spefificProblem);

  return (
    <>
      {problems.map((problem) => {
        return (
          <Problem
            name={problem.name}
            key={problem.id}
            title={problem.title}
            content={problem.content}
            userId={problem.userId}
            problemId={problem.id}
            status={problem.status}
          />
        );
      })}
    </>
  );
}
