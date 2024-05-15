import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Todo from "@/app/api/models/todoModel";



export async function POST(req) {
    try {



        let { title, description, status, priority, expiry, userId } = req.json()

        const createTodo = await Todo.create({ userId, title, description, status, priority, expiry })
        return NextResponse.json(createTodo)
    }
    catch (error) {
        return NextResponse.json("error creating Todo", { status: 500 })
    }




}
export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        const userId = searchParams.get('id')
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')
        const sortingElement = searchParams.get('sortingElement')
        const sortingOrder = Number(searchParams.get('sortingOrder'))
        const fetchTodo = await Todo.find({ userId: userId, isDeleted: false }).sort({ [sortingElement]: sortingOrder }).limit(limit).skip((page) * limit);

        return NextResponse.json(fetchTodo)
    }
    catch (error) {
        console.log("error fetching data")
    }




}

export async function PUT(req) {

    // requesting data from front-end
    const { title, description, status, priority, expiry, id, isDeleted } = await req.json();
    const newTodo = {}
    if (title) { newTodo.title = title }
    if (description) { newTodo.description = description }
    if (status) { newTodo.status = status }
    if (priority) { newTodo.priority = priority }
    if (expiry) { newTodo.expiry = expiry }
    if (isDeleted) { newTodo.isDeleted = isDeleted }



    let todo = await Todo.findByIdAndUpdate(id, { $set: newTodo })
    return NextResponse.json(todo)




}

export async function DELETE(req) {
    // requesting data from the front-end
    const todo = req.json();
    // storing todoId in the id var
    const id = todo._id;
    // creating a db client
    try {
        if (id) {
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
