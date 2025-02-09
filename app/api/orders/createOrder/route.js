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
        for (let i = 0; i < body.products.length; i++) {
            const product = await prisma.product.findUnique({
                where: {
                    id: body.products[i].idProd,
                },
                select: {
                    stock: true,
                    sold: true,
                },
            });
            console.log("requested quantity: ", body.products[i].qte);
                console.log("stock: ", product.stock);
                console.log("sold: ", product.sold);
                console.log("new stock: ", product.stock - product.sold - body.products[i].qte);
        
            if (product && (body.products[i].qte <= (product.stock - product.sold))) {
                
                await prisma.product.update({
                    where: {
                        id: body.products[i].idProd,
                    },
                    data: {
                        sold: {
                            increment: body.products[i].qte,
                        },
                    },
                });
            } else {
                console.log(`Insufficient stock for product ID: ${body.products[i].idProd}`);
                return NextResponse.json({ success: false, error: `Stock insuffisant` });
            }
        }
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