import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async (req) => {
  
  const requ = String(req.url);
  const id = requ.replace("http://localhost:3000/api/user/", "");

  try {
    await connectToDb();
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
