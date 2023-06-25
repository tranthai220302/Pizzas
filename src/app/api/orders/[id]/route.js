import { NextResponse } from "next/server"
import connect from "@/ults/db"
import Order from "@/models/Order";


export const GET = async (request, {params}) => {
    const {id} = params;
    try {
        await connect();
        const getOrder = await Order.findById(id);
        return new NextResponse(JSON.stringify(getOrder), {status: 200})
    } catch (error) {
        return new NextResponse(error, {status: 500})    
    }
}