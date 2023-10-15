import CopyButton from "@/components/copyButton/page";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getAllFeedback = async () => {
  const response = await fetch("http://localhost:3000/api/feedback", {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });

  const data = await response.json();
  return data;
};

export default async function AdminFeedback() {
  const feedbacks = await getAllFeedback();


  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;
  const email = session?.user?.email;

  if (!session && email !== "manasa3@gmail.com") redirect("/signin");
  return (
    <>
      {
        feedbacks.map((feedback) => {
          return (
            <div>
              <h1>{feedback.id}</h1>
              <CopyButton textToCopy={feedback.id} />
              <h2>{feedback.problemId}</h2>
              <h3>{feedback.description}</h3>
              <h4>{feedback.userId}</h4>
              <h3>{feedback.check}</h3>
              <br />
            
            </div>
          );
        })
      }
    </>
  );
}
