import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Problem from "@/components/Problems/Problem";


const getallProblems = async () => {
  const response = await fetch("http://localhost:3000/api/problems", {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();
  return data;
};

export default async function AllProblems() {
  const problems = await getallProblems();

  // console.log("problems = ", problems);

  const session = await getServerSession(authOptions);

  if (typeof window !== "undefined") return null;

  if (!session) redirect("/signin");
  else
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
            />
          );
        })}
      </>
    );
}
