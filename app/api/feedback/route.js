import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const POST = async (request) => {
  try {
    await connectToDb();
    const body = await request.json();
    const { problemId, description, check } = body.data;

    if (!problemId || !description || !check) {
      return NextResponse.json(
        { message: "Please fill in all the fields" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        problemId,
        description,
        check,
        userId: body.id,
      },
    });

    // console.log("api problem", problem);
    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
