import { NextResponse } from "next/server";
import Note from "@/app/api/models/noteModel";



export async function POST(req) {
    try {



        let note = await req.json()

        const createNote = await Note.create({ description: note.description, todoId: note.todoId })
        return NextResponse.json(createNote)
    }
    catch (error) {
        return NextResponse.json(error, { status: 500 })
    }




}
export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        const todoId = searchParams.get('id')
        const fetchTodo = await Note.find({ todoId: todoId }).sort({ createdAt: -1 });
        return NextResponse.json(fetchTodo)
    }
    catch (error) {
        return NextResponse.json("error fetching data")
    }




}

export async function PUT(req) {

    // requesting data from front-end
    const { id, ...note } = await req.json();
    const newNote = {}

    if (note.description) { newNote.description = note.description }




    let updatedNote = await Note.findByIdAndUpdate(id, { $set: newNote })
    return NextResponse.json(updatedNote)




}

export async function DELETE(req) {
    const { id } = await req.json();


    try {
        if (id) {


            // deleting note based on its id
            const res = await Note.findByIdAndDelete(id);
            if (!res) {
                return NextResponse.json({ "message": "Not Found" }, { status: 404 })

            }

            return NextResponse.json({ res: res }, { status: 200 })
        }

    }
    catch (error) {
        return NextResponse.json({ "message": error }, { status: 404 })
    }
}
