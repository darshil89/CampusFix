import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";

export const POST = async (request) => {
  try {
    await connectToDb();
    const body = await request.json();
    const { workerName, userId, problemId, phone, date, status } = body.data;
    console.log("body", body);
    const notification = await prisma.notification.create({
      data: {
        workerName,
        userId,
        problemId,
        phone,
        date,
        status,
      },
    });
    console.log("notification", notification);
    // console.log("api problem", problem);
    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
