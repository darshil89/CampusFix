import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

async function getUsers() {
  try {
    await connectToDb();
    const users = await prisma.user.findMany({
      include: {
        problems: true,
        _count: true,
      },
    });
    return users;
  } catch (error) {
    return error;
  }
}

export const GET = async (request) => {
  try {
    const users = await getUsers();
    console.log("got users again", users);

    const { searchParams } = new URL(request.url);

    console.log(request.url);

    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { message: "No id entered" },
        { status: 400 }
      );
    }

    const filterUsers = users.filter((user) => {
      return user.email.toLowerCase().includes(query.toLowerCase());
    });

    return NextResponse.json(
      { users: filterUsers },
      { status: 200, message: "success" }
    );

    // return NextResponse.json({ users }, { status: 200, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
