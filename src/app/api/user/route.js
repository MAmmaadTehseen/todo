import { NextResponse } from "next/server";
import User from "@/app/api/models/userModel";
import bcrypt from "bcrypt"
export async function POST(req) {
    try {


        let { name, email, password, url } = req.json()
        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hash(password, salt)


        const createUser = await User.create({ name, email, password: hash, url })
        return NextResponse.json(createUser)
    }
    catch (error) {
        return NextResponse.json(error)

    }




}
export async function GET(req, res) {

    try {


        const fetchUser = await User.find({});
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

    if (password) {
        newUser.password = password

        const user = await User.findById(id);
        const matchedpassword = await bcrypt.compare(check, user.password)
        if (!matchedpassword) {
            return NextResponse.json({ mes: "Wrong Password" }, {
                status: 400,
            })
        }
        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hash(password, salt)
        newUser.password = hash

    }


    let todo = await User.findByIdAndUpdate(id, { $set: newUser })
    return NextResponse.json(todo, { status: 200 })




}
