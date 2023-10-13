import CopyButton from "../copyButton/page";

const getAllProblem = async () => {
  const res = await fetch("http://localhost:3000/api/problems", {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return data;
};

export default async function UserDashboard() {
  const problems = await getAllProblem();
  // console.log("problems = ", problems);
  return (
    <>
      <h1 className="text-2xl font-bold">User</h1>
      {problems.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <div className="flex flex-row ">
              <p>ID: {item.id}</p>
              <CopyButton textToCopy={item.id} />
            </div>
            <p>Created At: {item.createdAt}</p>
            <p>Updated At: {item.updatedAt}</p>
            <p>Content: {item.content}</p>
            <p>Building Number: {item.buildingNumber}</p>
            <p>Room Number: {item.roomNumber}</p>
            <p>Floor Number: {item.floorNumber}</p>
            <p>User ID: {item.userId}</p>
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
}
