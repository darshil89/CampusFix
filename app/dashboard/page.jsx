import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  console.log("server page   ", session);
  const email = session?.user?.email;
  const checkAdmin = email === "manasa3@gmail.com";

  if (!checkAdmin && session) {
    return <h1>Hi user {session?.user.name}</h1>;
  } else if (checkAdmin && session) {
    return <h1>Hi admin {session?.user.name}</h1>;
  } else {
    redirect("/signin");
  }
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}

export default Dashboard;
