import connectToMongo from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/api/models/userModel";
import bcrypt from "bcrypt"
export async function POST(req) {
    try {


        let { name, email, password, url } = await req.json()
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)


        await connectToMongo()
        const createUser = await User.create({ name, email, password: hash, url })
        console.log("CREATING USER")
        return NextResponse.json(createUser)
    }
    catch (error) {
        return NextResponse.json("error creating user")

    }




}
export async function GET(req, res) {

    try {
        await connectToMongo()


        const fetchUser = await User.find({});
        console.log("getting USer")
        return NextResponse.json(fetchUser)
    }
    catch (error) {
        return NextResponse.json("error getting user")
    }




}

export async function PUT(req) {

    // requesting data from front-end
    const { name, email, url, id, password, check } = await req.json();
    const newUser = {}
    if (name) { newUser.name = name }
    if (email) { newUser.email = email }
    if (url) { newUser.url = url }

    if (password) { newUser.password = password }
    await connectToMongo()

    const user = await User.findById(id);
    const matchedpassword = await bcrypt.compare(check, user.password)
    if (!matchedpassword) {
        return NextResponse.json({ mes: "ammad", status: "400" })
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    newUser.password = hash




    let todo = await User.findByIdAndUpdate(id, { $set: newUser })
    return NextResponse.json({ msg: "ammad34" })




}
