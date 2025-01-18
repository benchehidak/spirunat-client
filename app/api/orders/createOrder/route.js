// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// export async function POST(req)  {
//     const prisma = new PrismaClient();
//     const body = await req.json();
//     console.log("Body", body);
//     if(body.deliveryInfo == undefined){
//         console.log("DeliveryInfo", body.deliveryInfo == undefined);
//         body.deliveryInfo = {
//             deliveryDate: '',
//             deliveryTime: '',
//             deliveryFee: 0,
//             delivery_carrier: '',
//             tracking_number: '',
//         }
//     }
//     if(body.discount == undefined){
//         console.log("Discount", body.discount == undefined);
//         body.discount = {
//             amount: 0,
//             percentage: 0,
//         }
//     }

//     try{
//         const order = await prisma.order.create({
//             data: {
//                 products: body.products.map(product => ({
//                     idProd: product.idProd,
//                     qte: product.qte,
//                 })),
//                 totalAmount: body.totalAmount,
//                 status: 'pending',
//                 deliveryAdress: {
//                     street: body.deliveryAdress.street,
//                     city: body.deliveryAdress.city,
//                     state: body.deliveryAdress.state,
//                     zipCode: body.deliveryAdress.zipCode,
//                 },
//                 paymentMethod: body.paymentMethod,
//                 deliveryMethod: body.deliveryMethod,
//                 deliveryInfo: {
    
//                     deliveryDate: body.deliveryInfo.deliveryDate,
//                     deliveryTime: body.deliveryInfo.deliveryTime,
//                     deliveryFee: body.deliveryInfo.deliveryFee,
//                     delivery_carrier: body.deliveryInfo.delivery_carrier,
//                     tracking_number: body.deliveryInfo.tracking_number,
//                 },
//                 discount: {
//                     amount: body.discount.amount,
//                     percentage: body.discount.percentage,
//                 },
//             },
//         });
//         return NextResponse.json({ success: true, order });
//     }
//     catch(error){
//         console.log(error);
//         return NextResponse.json({ success: false, error: error.message });
//     }
//     finally {
//         await prisma.$disconnect();
//     }
// }
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req)  {
    const prisma = new PrismaClient();
    const body = await req.json();
    console.log("Body", body);

    if(body.deliveryInfo == undefined){
        console.log("DeliveryInfo", body.deliveryInfo == undefined);
        body.deliveryInfo = {
            deliveryDate: '',
            deliveryTime: '',
            deliveryFee: 0,
            delivery_carrier: '',
            tracking_number: '',
        }
    }
    if(body.discount == undefined){
        console.log("Discount", body.discount == undefined);
        body.discount = {
            amount: 0,
            percentage: 0,
        }
    }

    try {
        console.log("Creating order with data:", body);
        const order = await prisma.order.create({
            data: {
                idUser: body.user,
                fname: body.fname,
                lname: body.lname,
                products: body.products.map(product => ({
                    idProd: product.idProd,
                    prodName: product.prodName,
                    qte: product.qte,
                    price: product.price,
                })),
                totalAmount: body.totalAmount,
                status: 'pending',
                deliveryAdress: {
                    street: body.deliveryAdress.street,
                    city: body.deliveryAdress.city,
                    state: body.deliveryAdress.state,
                    zipCode: body.deliveryAdress.zipCode,
                },
                paymentMethod: body.paymentMethod,
                deliveryMethod: body.deliveryMethod,
                deliveryInfo: {
                    deliveryDate: body.deliveryInfo.deliveryDate,
                    deliveryTime: body.deliveryInfo.deliveryTime,
                    deliveryFee: body.deliveryInfo.deliveryFee,
                    delivery_carrier: body.deliveryInfo.delivery_carrier,
                    tracking_number: body.deliveryInfo.tracking_number,
                },
                discount: {
                    amount: body.discount.amount,
                    percentage: body.discount.percentage,
                },
            },
        });
        return NextResponse.json({ success: true, order });
    }
    catch(error){
        console.log("Error creating order:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
}