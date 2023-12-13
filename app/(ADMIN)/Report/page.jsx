import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminReport from "@/components/adminReport/AdminReport";

export default async function Report() {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;
  const email = session?.user?.email;
  if (!session || email !== process.env.ADMIN_EMAIL) redirect("/");
  return (
    <>
      <div className="text-4xl mt-8 ml-4 mb-4 text-gray-700 font-semibold">
        Report <span className="text-blue-500">Page</span>
      </div>
      <AdminReport />
    </>
  );
}
