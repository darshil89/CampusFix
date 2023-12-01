import CopyButton from "@/components/copyButton/page";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDb } from "@/utils";
import prisma from "@/prisma";

export default async function AdminFeedback() {
  await connectToDb();
  const feedbacks = await prisma.feedback.findMany();

  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;
  const email = session?.user?.email;

  if (!session && email !== process.env.ADMIN_EMAIL) redirect("/signin");

  if (!feedbacks) return <h1>No Feedbacks</h1>;

  if (session && email === process.env.ADMIN_EMAIL) {
    return (
      <>
        {feedbacks.map((feedback, index) => {
          return (
            <div key={index}>
              <div className="flex">
                <h1>Feedback ID : {feedback.id}</h1>
                <CopyButton textToCopy={feedback.id} />
              </div>
              <h2>Problem ID : {feedback.problemId}</h2>
              <h4>User ID : {feedback.userId}</h4>
              <h3>Description : {feedback.description}</h3>
              <h3>Status : {feedback.check}</h3>
              <br />
            </div>
          );
        })}
      </>
    );
  }
}
