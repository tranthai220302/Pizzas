import { NextResponse } from "next/server"
import connect from "../../../../ults/db"
import Order from "@/models/Order";
export const GET = async (request) =>{
    try {
        await connect();
        const listOrder = await Order.find();
        return new NextResponse(JSON.stringify(listOrder), {status: 200})
    } catch (error) {
        return new NextResponse(error, {status: 500})
    }
}

export const POST = async (request) => {
    const body = await request.json();
    const newOrder = new Order(body);
    try {
        await connect();
        await newOrder.save();
        return new NextResponse(JSON.stringify(newOrder), { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse(error, { status: 500 });
    }
}