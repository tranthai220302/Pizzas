import connect from "@/ults/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const {id} = params;
    try {
        await connect();
        const product = await Product.findById(id)
        return new NextResponse(JSON.stringify(product), {status: 200})
    } catch (error) {
        return new NextResponse(error, {status: 500})
    }
};

export const DELETE = async (request, {params})=>
{
  const {id} = params;
  try {
    await connect();
    const isDelete = await Product.findByIdAndDelete(id);
    return new NextResponse("The product has been delete", {status: 200})
  } catch (error) {
    return new NextResponse(err, {status: 500})
  }
}