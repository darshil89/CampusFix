import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const GET = async (req) => {
  console.log("req.url of notification backend = ", req.url);
  const requ1 = String(req.url);
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://dayanand.vercel.app";

  const id = requ1.replace(`${baseUrl}/api/notification/`, "");

  console.log("id", id);
  try {
    await connectToDb();
    

    const notifications = await prisma.notification.findMany({
      where: {
        userId: id,
      },
    });

    console.log("api notifications", notifications);

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
