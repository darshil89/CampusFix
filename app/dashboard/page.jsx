import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserDashboard from "@/components/dashboard/userDashboard";
import CopyButton from "@/components/copyButton/page";
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  const email = session?.user?.email;

  const checkAdmin = email === "manasa3@gmail.com";

  if (!checkAdmin && session) {
    return (
      <>
        <h1 className="text-center text-5xl">Hi user {session?.user.name}</h1>
       

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
export default Dashboard;
