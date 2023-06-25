import cookie from "cookie";
import { NextResponse } from "next/server";

export const POST = async (request) =>{
    const body = await request.json();
    const { username, password } = body;
    console.log(username)
    console.log(password)
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD

    ) {
      return new NextResponse("Succesfull", {status: 200})
    } else {
        return new NextResponse("Error", {status: 500})
    }
}
