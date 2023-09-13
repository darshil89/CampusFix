import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserDashboard from "@/components/dashboard/userDashboard";
import AdminDashboard from "@/components/dashboard/adminDashboard";
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  const email = session?.user?.email;

  const checkAdmin = email === "manasa3@gmail.com";
  // console.log("checkAdmin", checkAdmin);
  console.log("session dashboard", session);
  console.log("id of user in main dashboard", session?.user.id);

  if (!checkAdmin && session) {
    return (
      <>
        <h1 className="text-center text-5xl">Hi user {session?.user.name}</h1>
        <UserDashboard id={session?.user.id} />
      </>
    );
  } else if (checkAdmin && session) {
    return (
      <>
        <h1 className="text-center text-5xl">Hi admin {session?.user.name}</h1>
        <AdminDashboard id={session?.user.id} />
      </>
    );
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
