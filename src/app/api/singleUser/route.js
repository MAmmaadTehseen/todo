import { NextResponse } from "next/server";
import User from "@/app/api/models/userModel";

export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get('id')
        const fetchUser = await User.findById(id);
        return NextResponse.json(fetchUser)
    }
    catch (error) {
        return NextResponse.json("error fetching User")
    }
}