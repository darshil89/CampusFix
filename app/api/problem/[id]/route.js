import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export async function GET(req) {
  console.log("req.url of problem backend = ", req.url);
  const requ1 = String(req.url);
  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://dsce-project.vercel.app";

  const id = requ1.replace(`${baseUrl}/api/problem/`, "");

  try {
    await connectToDb();
    const problem = await prisma.problem.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ problem }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const DELETE = async (request) => {
  try {
    const { id } = request.params;
    await connectToDb();
    const problem = await prisma.problem.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
