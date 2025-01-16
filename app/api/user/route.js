import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';


export async function POST(req) {
    const { nom, prenom,email, password } = await req.json();
    const hash = await bcrypt.hash(password,10);
    const prisma = new PrismaClient();
    try
    {
        const user = await prisma.util.create({
            data: {
                nom: nom,
                prenom: prenom,
                email: email,
                password: hash
            }
        });
        return NextResponse.json({success: true, user});
    }
    catch(e)
    {
        console.log(e);
        return NextResponse.json({success: false, error: e.message});
    }
    finally
    {
        await prisma.$disconnect();
    }
}