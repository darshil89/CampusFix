import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Form from "../../../components/userProfile/form";
import Image from "next/image";
import Notification from "../../../components/userNotification/Notification";
const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (typeof window !== "undefined") return null;

  const email = session?.user?.email;

  // console.log("sessions", session);

  const checkAdmin = email === process.env.ADMIN_EMAIL;

  const problems = session?.user?.problems.length;

  // console.log("problem = ", problems);

  // const onSubmit = async (e) => {};

  if (!checkAdmin && session) {
    return (
      <div className="flex justify-center flex-row   w-full">
        <div className="w-1/3 bg-white rounded-md overflow-hidden shadow-md mr-2">
          <div className="bg-opacity-75 bg-blue-500 text-white text-center p-4">
            <Image
              src={session?.user?.image ? session?.user?.image : "/images/profile.png"}
              width={500}
              height={500}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-white"
            />
            <h1 className="text-2xl font-bold mt-2">{session?.user?.name}</h1>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name: {session?.user?.name}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email: {session?.user?.email}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Issue Posted: {session?.user?.problems.length}
              </label>
            </div>
            <Form />
          </div>
        </div>
        <div className="w-1/3 bg-white rounded-md overflow-hidden shadow-md">
        <div className="bg-opacity-75 bg-blue-500 text-white text-center p-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>
          <Notification userId={session?.user?.id}/>
        </div>
      </div>
    );
  } else {
    redirect("/signin");
  }
};

export default Profile;
