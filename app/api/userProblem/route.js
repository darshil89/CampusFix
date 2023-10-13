import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const POST = async (request) => {
  try {
    await connectToDb();
    const body = await request.json();
    // console.log("body", body);
    const email = body.props;

    const problems = await prisma.problem.findMany({
      where: {
        user: {
          email: email,
        },
      },
    });
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
