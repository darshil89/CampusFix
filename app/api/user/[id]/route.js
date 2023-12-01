import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async (req) => {
  const requ = String(req.url);

  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://dsce-project.vercel.app";
  const id = requ.replace(`${baseUrl}/api/user/`, "");

  try {
    await connectToDb();
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        problems: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
