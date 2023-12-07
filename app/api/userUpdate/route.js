import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils";
import bcrypt from "bcrypt";
export const POST = async (req) => {
  const { data } = await req.json();

  console.log("data", data);

  if (data.password && !data.confirmPassword) {
    return NextResponse.json(
      { message: "Please confirm your assword" },
      { status: 400 }
    );
  }

  if (data.password && data.password !== data.confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    await connectToDb();
    if (data.image && data.password) {
      const user = await prisma.user.update({
        where: {
          id: data.userId,
        },
        data: {
          image: data.image,
          password: hashedPassword,
        },
      });
      return NextResponse.json({ user }, { status: 200 });
    } else if (data.image) {
      const user = await prisma.user.update({
        where: {
          id: data.userId,
        },
        data: {
          image: data.image,
        },
      });
      return NextResponse.json({ user }, { status: 200 });
    } else if (data.password) {
      const user = await prisma.user.update({
        where: {
          id: data.userId,
        },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
