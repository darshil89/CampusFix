import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserDashboard from "@/components/dashboard/userDashboard";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;

  const email = session?.user?.email;

  const checkAdmin = email === process.env.ADMIN_EMAIL;

  if (!checkAdmin && session) {
    return (
      <>
      <div className="text-4xl mt-8 ml-4 mb-2 text-gray-700 font-semibold">
          User&apos;s Dashboard <span className="text-blue-500">Overview</span>
        </div>
        <h1 className=" text-2xl ml-4 mb-2 text-gray-900 font-semibold">Welcome {session?.user.name}</h1>
        <UserDashboard email={email}/>
      </>
    );
  } else {
    redirect("/signin");
  }
};
export default Dashboard;
