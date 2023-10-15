import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async () => {
  try {
    await connectToDb();
    const problems = await prisma.problem.findMany();
    // console.log("route = ", problems);
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectToDb();
    const body = await request.json();
    console.log("body = ", body);
    const problem = await prisma.problem.findMany({
      where:{
        status: body.status
      }
    })
    return NextResponse.json(problem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}