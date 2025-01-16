import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    const errors = validationResult(req);
    let orders;
    if (!errors.isEmpty()) {
        return NextResponse.json({ success: false, errors: errors.array() });
    }

    const { idUser } = body;

    try {
         orders = await prisma.order.findMany({
            where: { idUser }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ success: false, error });
    }
    if (!orders) {
        return NextResponse.json({ success: false, message: 'No orders found' });
    }
    if (orders.length === 0) {
        return NextResponse.json({ success: false, message: 'No orders found' });
    }
    

    return NextResponse.json({ success: true, orders });
}