import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  
  const email = session?.user?.email;
  
  const checkAdmin = email === "manasa3@gmail.com";
  // console.log("checkAdmin", checkAdmin);
   console.log("session dashboard", session);

  if (!checkAdmin && session) {
    return <h1 className="text-center text-5xl" >Hi user {session?.user.name}</h1>;
  } else if (checkAdmin && session) {
    return <h1 className="text-center text-5xl">Hi admin {session?.user.name}</h1>;
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
