import { NextResponse } from "next/server";
import Todo from "@/app/api/models/todoModel";
import Note from "@/app/api/models/noteModel"

export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        console.log(searchParams)
        const id = await searchParams.get('id')
        console.log(id)
        console.log("getting Todo")
        const fetchTodo = await Todo.findById(id);
        const fetchNote = await Note.find({ todoId: id }).sort({ createdAt: -1 })
        return NextResponse.json({ todo: fetchTodo, note: fetchNote })
    }
    catch (error) {
        console.log("error fetching data")
    }




}