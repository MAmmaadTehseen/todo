import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function GET(req, res) {

    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get('id')
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
        return NextResponse.json({ "Error": "Error fetching data" })
    }




}