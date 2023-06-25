import { NextResponse } from "next/server"
import connect from "@/ults/db"
import Product from "@/models/Product"

export const GET = async (request) =>{
    try {
        await connect()
        const listProduct = await Product.find()
        return new NextResponse(JSON.stringify(listProduct), {status: 200})
    } catch (error) {
        return new NextResponse(error, {status: 500})
    }
}
export const POST = async (request) => {
    const body = await request.json();
  
    const newProduct = new Product(body);
  
    try {
      await connect();
  
      await newProduct.save();
  
      return new NextResponse("Product has been created", { status: 201 });
    } catch (err) {
      return new NextResponse(err, { status: 500 });
    }
  };

