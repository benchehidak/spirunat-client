import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const prisma = new PrismaClient();
  const { token, newPassword } = await req.json();
  const resetToken = await prisma.resetToken.findUnique({
    where: { token },
  });
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json({
        success: false,
        message: "Invalid or expired token",
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try{
    await prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      });
    
  }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error,
        });
    } 
    try{
        await prisma.resetToken.delete({ where: { id: resetToken.id } });
        return NextResponse.json({
            success: true,
            message: "Password reset successfully",
        });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error,
        });
    }
    finally {
        await prisma.$disconnect();
    }
}
