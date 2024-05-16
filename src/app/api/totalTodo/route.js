import { NextResponse } from "next/server";
import Todo from "@/app/api/models/todoModel";

export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get('id')
        const fetchTodo = await Todo.countDocuments({ userId: id, isDeleted: false, });
        return NextResponse.json(fetchTodo)
    }
    catch (error) {
        return NextResponse.json("error fetching total")
    }




}