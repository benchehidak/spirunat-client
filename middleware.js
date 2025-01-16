export { default } from 'next-auth/middleware'
// import { withAuth } from 'next-auth/middleware'

// export default withAuth({
//   callbacks: {
//     authorized: ({ req, token }) => {
//       if (req.nextUrl.pathname === '/admin/addactivities' || req.nextUrl.pathname === '/admin/activities' || req.nextUrl.pathname === '/admin/addmembers' || req.nextUrl.pathname === '/admin/payments' || req.nextUrl.pathname === '/admin/addpayments' || req.nextUrl.pathname === '/admin/adddoc' || req.nextUrl.pathname === '/admin/members' || req.nextUrl.pathname === '/admin/addpayment' || req.nextUrl.pathname === '/api/activity/testact' ) {
//         // console.log(token)
//         return token?.role 
//       }

//       return Boolean(token)
//     }
//   }
// })

export const config = { matcher: [ '/account/:path*','/api/protected/:path*', '/shop-checkout', ], debug: true,}
//'/api/protected/:path*'
