import CopyButton from "@/components/copyButton/page";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

let apiUrl;

if (typeof window !== "undefined") {
  // Determine the current port dynamically in the browser context
  const currentPort =
    window.location.port ||
    (window.location.protocol === "https:" ? "443" : "80");

  // Construct the API URL with the determined port
  apiUrl = `${window.location.protocol}//${window.location.hostname}:${currentPort}/api/feedback`;
} else {
  // Handle the case when running on the server (no window object)
  // You might want to provide a default API URL or throw an error based on your needs.
  apiUrl = "http://localhost:3000/api/feedback";
}

const getAllFeedback = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      next: {
        revalidate: 0,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error from file = ",error);
  }
};

export default async function AdminFeedback() {
  const feedbacks = await getAllFeedback();

  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;
  const email = session?.user?.email;

  if (!session && email !== "manasa3@gmail.com") redirect("/signin");
  return (
    <>
      {feedbacks.map((feedback, index) => {
        return (
          <div key={index}>
            <div className="flex">
              <h1>Feedback ID : {feedback.id}</h1>
              <CopyButton textToCopy={feedback.id} />
            </div>
            <h2>Problem ID : {feedback.problemId}</h2>
            <h4>User ID : {feedback.userId}</h4>
            <h3>Description : {feedback.description}</h3>
            <h3>Status : {feedback.check}</h3>
            <br />
          </div>
        );
      })}
    </>
  );
}
