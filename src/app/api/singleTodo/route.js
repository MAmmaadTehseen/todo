import { NextResponse } from "next/server";
import Todo from "@/app/api/models/todoModel";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function GET(req, res) {

    try {
        const searchParams = req.nextUrl.searchParams
        const id = await searchParams.get('id')
        const fetchTodo = await Todo.findById(id);
        console.log(fetchTodo)
        console.log(id)
        const data = await mongoose.model("Todo").aggregate([
            {
                $lookup: {
                    from: "notes",
                    localField: "_id",
                    foreignField: "todoId",
                    as: "notes"
                }
            },
            { $match: { _id: new ObjectId(id) } },






        ]).exec()

        return NextResponse.json({ ...data })
    }
    catch (error) {
        return NextResponse.json({ "error": "error fetching data" })
    }




}