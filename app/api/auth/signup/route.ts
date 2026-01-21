import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  ConnectToDatabase  from "@/lib/mongodb";
import User from "../../../../models/user";

export async function POST(request: Request) {
  try {
    await ConnectToDatabase();

    const body = await request.json();
    const { name, email, password, role, editorProfile } = body;

    //  Validate basic fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    //  Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      editorProfile: role === "EDITOR" ? editorProfile : undefined,
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } 
  catch (error) {
    console.error("error:", error);

    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
