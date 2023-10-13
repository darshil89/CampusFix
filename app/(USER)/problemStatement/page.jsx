import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Problems from "@/components/problemForm/page";
const Problem = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  console.log("server page   ", session);
  const email = session?.user?.email;
  const id = session?.user?.id;
  const checkAdmin = email === "manasa3@gmail.com";
  const name = session?.user?.name;
  const status = "pending";

  if (session && !checkAdmin) {
    return (
      <>
        <Problems id={id} name={name} status={status} />
      </>
    );
  }

  redirect("/signin");
};

export default Problem;
