import connectToMongo from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/api/models/userModel";

export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        const id = await searchParams.get('id')
        await connectToMongo()
        // console.log("getting User")
        const fetchUser = await User.findById(id);
        return NextResponse.json(fetchUser)
    }
    catch (error) {
        console.log("error fetching User")
    }
}