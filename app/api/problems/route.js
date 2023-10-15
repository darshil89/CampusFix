import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async () => {
  try {
    await connectToDb();
    const problems = await prisma.problem.findMany({
      where: {
        status: "pending",
      },
    });
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectToDb();
    const body = await request.json();
    // console.log("body", body);
    const { title, content, buildingNumber, floorNumber, roomNumber } =
      body.data;

    if (title === "" || title === null) {
      return NextResponse.json(
        { error: "Please fill in the title" },
        { status: 400 }
      );
    }

    if (!title || !content || !buildingNumber || !floorNumber || !roomNumber) {
      return NextResponse.json(
        { message: "Please fill in all the fields" },
        { status: 400 }
      );
    }

    if (Number(buildingNumber) > 26 || Number(buildingNumber) == 0) {
      return NextResponse.json(
        { error: "Please enter a valid building number" },
        { status: 400 }
      );
    }

    if (Number(floorNumber) > 10) {
      return NextResponse.json(
        { error: "Please enter a valid floor number" },
        { status: 400 }
      );
    }

    if (Number(roomNumber) >= 1000 || Number(roomNumber) < 100) {
      return NextResponse.json(
        { error: "Please enter a valid room number" },
        { status: 400 }
      );
    }

    const problem = await prisma.problem.create({
      data: {
        title,
        content,
        buildingNumber,
        floorNumber,
        roomNumber,
        name: body.name,
        status: body.status,
        userId: body.id,
        image: body.uploadedImageUrls,
      },
    });

    return NextResponse.json(problem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
