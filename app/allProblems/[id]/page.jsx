async function getProblem(id) {
  console.log("id allProblem k 1st function= ", id);
  const res = await fetch(`http://localhost:3000/api/problem/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const problem = await res.json();
  return problem;
}

export default async function Problem({ params: { id } }) {
  console.log("id allProblem k 2nd function = ", id);
  const { problem } = await getProblem(id);
  const {
    title,
    content,
    userId,
    floorNumber,
    roomNumber,
    buildingNumber,
  } = problem;
  return (
    <>
      <div>My Problem id is = {id}</div>
      <div>My Problem title is = {title}</div>
      <div>My Problem content is = {content}</div>
      <div>My Problem userId is = {userId}</div>
      <div>My Problem id is = {id}</div>
      <div>My Problem floorNumber is = {floorNumber}</div>
      <div>My Problem roomNumber is = {roomNumber}</div>
      <div>My Problem buildingNumber is = {buildingNumber}</div>
    </>
  );
}
