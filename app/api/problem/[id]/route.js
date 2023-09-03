import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async (request) => {
  try {
    const { id } = request.params;
    await connectToDb();
    const problem = await prisma.problem.findUnique({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ problem }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

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
