import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Problem from "@/components/Problems/Problem";
const getallProblems = async () => {
  const response = await fetch("http://localhost:3000/api/problems");
  const data = await response.json();
  return data;
};

export default async function allProblems() {
  const problems = await getallProblems();
  console.log("problems = ", problems);

  return (
    <>
      (
      {problems.map((problem) => {
        return (
          <Problem
            key={problem.id}
            title={problem.title}
            content={problem.content}
            userId={problem.userId}
            problemId={problem.id}
          />
        );
      })}
      )
    </>
  );
}
