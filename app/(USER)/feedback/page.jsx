import { getServerSession } from "next-auth";
import {authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from "next/navigation";
import Feedback from "@/components/feedbackForm/page";
const Problem = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  console.log("server page   ", session);
  const email = session?.user?.email;
  const id = session?.user?.id;
  const checkAdmin = email === process.env.ADMIN_EMAIL;
  const name = session?.user?.name;

  if (session && !checkAdmin) {
    return (
      <>
        <Feedback id={id} name={name} />
      </>
    );
  }

  redirect("/signin");
};

export default Problem;
