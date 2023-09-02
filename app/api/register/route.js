import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request) {
  try {
    const { email, password, name } = await request.json();
    //validate
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 422 }
      );
    }
    //connect to db
    await connectToDb();
    //check if user exists
    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 422 }
      );
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    //return user
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
