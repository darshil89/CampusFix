import Time from "@/components/date/Time";
import Carousel1 from "@/components/HomeComponents/Carousel/page";
import CopyButton from "@/components/copyButton/page";
const Card = ({
  title,
  email,
  userName,
  content,
  problemId,
  floornumber,
  roomnumber,
  buildingnumber,
  createdAt,
  image,
}) => {
  return (
    <>
      <div className="w-full sm:w-1 md:w-1/2 lg:w-1/3 xl:w-1/3 p-2">
        <div className="flex flex-col max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
          <div className="p-2 text-right">
            <span
              className={
                "inline-block text-blue-800 bg-blue-200 text-sm px-4 py-2 rounded-full  font-semibold tracking-wide"
              }
            >
              By {userName}
            </span>
          </div>
          <Carousel1 slides={image}></Carousel1>
          <div className="p-8 text-center">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {title}
            </div>
            <div className="block mt-2 text-base leading-tight font-medium text-black">
              {content}
            </div>
            <div className="mt-2">
              Email:
              {email}
            </div>
            <div className="flex justify-center items-center mt-2 text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <p>ID: {problemId}</p>
                <CopyButton textToCopy={problemId} />
              </div>
            </div>
            <div className="flex justify-around mt-4">
              <div>
                <p className="text-xs">Building Number</p>
                <p className="text-sm">{buildingnumber}</p>
              </div>
              <div>
                <p className="text-xs">Room Number</p>
                <p className="text-sm">{roomnumber}</p>
              </div>
              <div>
                <p className="text-xs">Floor Number</p>
                <p className="text-sm">{floornumber}</p>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="text-gray-500 text-xs">Created At</div>
              <Time className="text-black text-sm" createdAt={createdAt} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
