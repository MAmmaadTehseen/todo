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
        const fetchTodo = await Note.find({ todoId: todoId }).sort({ createdAt: -1 });
        return NextResponse.json(fetchTodo)
    }
    catch (error) {
        console.log("error fetching data")
    }




}

export async function PUT(req) {

    // requesting data from front-end
    const { description, id } = await req.json();
    const newNote = {}

    if (description) { newNote.description = description }

    await connectToMongo()



    let note = await Note.findByIdAndUpdate(id, { $set: newNote })
    return NextResponse.json(note)




}

export async function DELETE(req) {
    // requesting data from the front-end
    const { id } = await req.json();

    // creating a db client
    await connectToMongo()
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
