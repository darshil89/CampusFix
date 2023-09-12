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
    // console.log("api body", body);
    // console.log("api body", body.id);

    const problem = await prisma.problem.create({
      data: {
        title: body.data.title,
        content: body.data.description,
        buildingNumber: body.data.buildingNumber,
        roomNumber: body.data.roomNumber,
        floorNumber: body.data.floorNumber,
        userId: body.id,
      },
    });

    return NextResponse.json(problem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
