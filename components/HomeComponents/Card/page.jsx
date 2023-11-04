import Time from "@/components/date/Time";
import Carousel from "@/components/HomeComponents/Carousel/page";
const Card = ({
  title,
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
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg">
          <Carousel>
            {image.map((img, index) => (
              <img src={img} key={index} alt="Problem Image" />
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Title: {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Content:{content}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            ProblemId:{problemId}
          </p>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Time:
            <Time createdAt={createdAt}></Time>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Floor Number:{floornumber}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Room Number:{roomnumber}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Building Number:{buildingnumber}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
