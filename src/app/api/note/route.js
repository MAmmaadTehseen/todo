import connectToMongo from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Note from "@/app/api/models/noteModel";



export async function POST(req) {
    try {



        let { description, todoId } = await req.json()

        await connectToMongo()
        console.log("creating note")
        const createNote = await Note.create({ description, todoId })
        console.log("created note")
        return NextResponse.json(createNote)
    }
    catch (error) {
        return NextResponse.json(error, { status: 500 })
    }




}
export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        const todoId = await searchParams.get('id')
        await connectToMongo()
        // console.log("getting note")
        const fetchTodo = await Note.find({ todoId: todoId });
        return NextResponse.json(fetchTodo)
    }
    catch (error) {
        console.log("error fetching data")
    }




}

export async function DELETE(req) {
    // requesting data from the front-end
    const todo = await req.json();
    // storing todoId in the id var
    const id = todo._id;
    console.log(id)
    // creating a db client
    await connectToMongo()
    try {
        if (id) {
            console.log(id)
            // deleting user based on its id
            const res = await Todo.findByIdAndDelete(id);
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
