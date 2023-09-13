async function getProblem(id) {
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

async function getUser(id) {
  console.log("getUser id  = ", id);
  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  // console.log(" user k res = ", res);
  const user = await res.json();
  return user;
}

export default async function Problem({ params: { id } }) {
  console.log("id allProblem k 2nd function = ", id);
  const { problem } = await getProblem(id);

  const { user } = await getUser(problem.userId);
  console.log("user = ", user);
  console.log("problem of DP = ", problem);
  const {
    title,
    content,
    userId,
    floorNumber,
    roomNumber,
    buildingNumber,
    createdAt,
  } = problem;

  const { name, email } = user;
  return (
    <>
      <div className="text-xl">Problem</div>
      <div>My Problem id is = {id}</div>
      <div>Time = {createdAt}</div>
      <div>My Problem title is = {title}</div>
      <div>My Problem content is = {content}</div>
      <div>My Problem floorNumber is = {floorNumber}</div>
      <div>My Problem roomNumber is = {roomNumber}</div>
      <div>My Problem buildingNumber is = {buildingNumber}</div>
      <div className="text-xl">User</div>
      <div>User Name = {name}</div>
      <div>User Email = {email}</div>
    </>
  );
}
