import { NextResponse } from "next/server";
import User from "@/app/api/models/userModel";
import bcrypt from "bcrypt"
export async function POST(req) {
    try {


        let user = await req.json()
        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hash(password, salt)


        const createUser = await User.create({ name: user.name, email: user.email, password: hash, url: user.url })
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
    const { id, ...user } = await req.json();
    const newUser = {}
    console.log(user.password)
    if (user.name) { newUser.name = user.name }
    if (user.url) { newUser.url = user.url }
    console.log(user.url)
    if (user.password) {

        const user = await User.findById(id);
        const matchedpassword = await bcrypt.compare(user.check, user.password)
        if (!matchedpassword) {
            return NextResponse.json({ mes: "Wrong Password" }, {
                status: 400,
            })
        }
        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hash(password, salt)
        newUser.password = hash

    }


    let updatedUser = await User.findByIdAndUpdate(id, { $set: newUser })
    return NextResponse.json(updatedUser, { status: 200 })




}
