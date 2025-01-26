import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import { addHours } from "date-fns";

export async function POST(req) {
    const prisma = new PrismaClient();
    const { email } = await req.json();
    const token = randomBytes(32).toString("hex");
    const expiresAt = addHours(new Date(), 1);
    const findUser = await prisma.util.findUnique({
        where: {
            email,
        },
    });
    if (findUser === null) {
        return NextResponse.json({
            success: false,
            message: "User not found",
        });
    }

   try{
    await prisma.resetToken.create({
        data: {
          userId: findUser.id,
          token,
          expiresAt,
        },
      });

   }
    catch (error) {
        console.log(error);
     return NextResponse.json({
          success: false,
          message: "Error creating reset token",
     });
    }
    finally {
        await prisma.$disconnect();
    }
    const resetLink = `${process.env.NEXTAUTH_URL}/pages/resetPassword/${token}`;
    try{
        await nodemailer.createTransport({
            service: "Gmail",
            host: 'smtp.gmail.com',//'mail.gaviota.com.tn',
            port: 587,//465,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          }).sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the following link to reset your password: ${resetLink}`,
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
          });
            return NextResponse.json({
                success: true,
                message: "Email sent",
            });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error sending email",
        });
    }  
}