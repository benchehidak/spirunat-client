import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    console.log("textxtxtxtxtxxtxtxt",decodeURI(body.slug));
    
    let product = null;
    try {
        product = await prisma.product.findFirst({
            where: {
                slug: body.slug
            }
        });
        // console.log('product', product);
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' });
        }
        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error });
    }
    
}