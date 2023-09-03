import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Problems from "@/components/problemForm/page";
const Problem = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  console.log("server page   ", session);
  const email = session?.user?.email;
  const checkAdmin = email === "manasa3@gmail.com";

  if (session && checkAdmin) {
    return (
      <>
        <h1>Hi {session?.user.name} , feel free to share your problem</h1>
        <Problems />
      </>
    );
  }

  redirect("/admin");
};

export default Problem;
