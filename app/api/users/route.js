import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await prisma.user.findMany({
      include: {
        problems: true,
        _count: true,
      },
    });
    return NextResponse.json({ users }, { status: 200, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    await connectToDb();
    const { email } = await req.json();

    await prisma.user.delete({
      where: {
        email: email,
      },
    });
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
