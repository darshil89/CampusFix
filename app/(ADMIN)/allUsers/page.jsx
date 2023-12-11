import ClientUserPage from "./user";
import Search from "../../../components/SearchCoins";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default function AllUsers() {
  const session = getServerSession(authOptions);
  const email = session?.user?.email;
  if (!session || email !== process.env.ADMIN_EMAIL) redirect("/signin");
  return (
    <>
      <div className="flex justify-between mt-8 ml-4 mb-4 flex-row">
        <div className="text-4xl  text-gray-700 font-semibold">
          All User&apos;s <span className="text-blue-500">Page</span>
        </div>
        <Search page={"users"}/>
      </div>
      <ClientUserPage />
    </>
  );
}
