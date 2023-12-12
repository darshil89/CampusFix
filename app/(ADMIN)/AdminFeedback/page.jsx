import CopyButton from "@/components/copyButton/page";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDb } from "@/utils";
import Image from "next/image";
import prisma from "@/prisma";
// import Search from "../../../components/SearchCoins";

export default async function AdminFeedback() {
  await connectToDb();
  const feedbacks = await prisma.feedback.findMany();

  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;
  const email = session?.user?.email;

  if (!session || email !== process.env.ADMIN_EMAIL) redirect("/");
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between mt-8 mb-4">
        <h1 className="text-4xl text-gray-700 font-semibold">
          All User&apos;s <span className="text-blue-500">Feedback</span>
        </h1>
      </div>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <h2 className="text-2xl font-bold mb-4">Not Completed</h2>
          {feedbacks
            .filter((feedback) => feedback.check !== "Completed")
            .map((feedback, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow mb-4 bg-red-100"
              >
                <div className="flex items-center mb-4">
                  <div className="">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        Problem ID : {feedback.problemId}
                      </div>
                      <CopyButton textToCopy={feedback.problemId} />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Description
                  </h2>
                  <p className="mt-2 text-base text-gray-700">
                    {feedback.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-red-600">
                    Status : {feedback.check}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="w-full md:w-1/2 px-2">
          <h2 className="text-2xl font-bold mb-4">Completed</h2>
          {feedbacks
            .filter((feedback) => feedback.check === "Completed")
            .map((feedback, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow mb-4 bg-green-100"
              >
                <div className="flex items-center mb-4">
                  <div className="">
                    <div className="flex ">
                      <div className="text-sm font-medium text-gray-900">
                        Problem ID : {feedback.problemId}
                      </div>
                      <CopyButton textToCopy={feedback.problemId} />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Description
                  </h2>
                  <p className="mt-2 text-base text-gray-700">
                    {feedback.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-green-600">
                    Status : {feedback.check}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
