import { NextResponse } from "next/server";
import Todo from "@/app/api/models/todoModel";

export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        console.log(searchParams)
        const id = await searchParams.get('id')
        console.log(id)
        console.log("getting Todo")
        const fetchTodo = await Todo.findById(id);
        return NextResponse.json(fetchTodo)
    }
    catch (error) {
        console.log("error fetching data")
    }




}