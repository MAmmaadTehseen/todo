import connectToMongo from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Todo from "@/app/api/models/todoModel";

export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        const id = await searchParams.get('id')
        await connectToMongo()
        const fetchTodo = await Todo.countDocuments({ userId: id, isDeleted: false, });
        return NextResponse.json(fetchTodo)
    }
    catch (error) {
        console.log("error fetching count")
    }




}