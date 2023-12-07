import Image from "next/image";
import CopyButton from "../copyButton/page";
import Time from "../date/Time";
import Carousel1 from "../HomeComponents/Carousel/page";
import Nodata from "../svg/nodata";
const getAllProblem = async (props) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://dayanand.vercel.app";
  const res = await fetch(`${baseUrl}/api/userProblem`, {
    method: "POST",
    body: JSON.stringify({ props }),
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return data;
};

export default async function UserDashboard(props) {
  const email = props.email;
  const problems = await getAllProblem(email);
  // console.log("problems = ", problems);
  if (problems.length === 0) {
    return (
      <>
        <div className="flex justify-center items-center">
         <Image src="/images/no-data.png" alt="No Data" width={600} height={600}></Image>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-wrap">
        {problems.map((item, key) => {
          return (
            <div
              key={key}
              className="w-full sm:w-1 md:w-1/2 lg:w-1/3 xl:w-1/3 p-2"
            >
              <div className="flex flex-col max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                <div className="p-2 text-right">
                  <span
                    className={`inline-block text-blue-800 text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide ${
                      item.status === "approved"
                        ? "bg-green-300"
                        : item.status === "rejected"
                        ? "bg-red-300"
                        : "bg-yellow-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <Carousel1 slides={item.image}></Carousel1>
                <div className="p-8 text-center">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {item.title}
                  </div>
                  <div className="block mt-2 text-base leading-tight font-medium text-black">
                    {item.content}
                  </div>
                  <div className="flex justify-center items-center mt-2 text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                      <p>ID: {item.id}</p>
                      <CopyButton textToCopy={item.id} />
                    </div>
                  </div>
                  <div className="flex justify-around mt-4">
                    <div>
                      <p className="text-xs">Building Number</p>
                      <p className="text-sm">{item.buildingNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs">Room Number</p>
                      <p className="text-sm">{item.roomNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs">Floor Number</p>
                      <p className="text-sm">{item.floorNumber}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="text-gray-500 text-xs">Created At</div>
                    <Time
                      className="text-black text-sm"
                      createdAt={item.createdAt}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="text-gray-500 text-xs">Updated At</div>
                    <Time
                      className="text-black text-sm"
                      createdAt={item.updatedAt}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
