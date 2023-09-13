import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async (request) => {
  try {
    const { id } = request.params;
    await connectToDb();
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};


