import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async () => {
  try {
    await connectToDb();

    const problems = await prisma.problem.findMany();
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectToDb();
    const body = await request.json();
    const { title, content, buildingNumber, floorNumber, roomNumber } =
      body.data;

    const problem = await prisma.problem.create({
      data: {
        title,
        content,
        buildingNumber,
        floorNumber,
        roomNumber,
        userId: body.id,
      },
    });

    // console.log("api problem", problem);
    return NextResponse.json(problem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
