// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next') || 
    /\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Protect /studio routes
  if (pathname.startsWith('/studio')) {
    try {
      const authState = await auth();
      
      if (!authState.userId) {
        return authState.redirectToSignIn({ returnBackUrl: req.url });
      }

      // Option 1: Check sessionClaims first (faster)
      const sessionClaims = authState.sessionClaims;
      console.log('Session Claims:', sessionClaims);
      
      let isAdmin = false;
      if (sessionClaims?.publicMetadata) {
        isAdmin = (sessionClaims.publicMetadata as { role?: string }).role?.toLowerCase() === 'admin';
      }

      // Option 2: If session claims don't work, fetch fresh user data
      if (!isAdmin && authState.userId) {
        const client = await clerkClient();
        const user = await client.users.getUser(authState.userId);
        console.log('User object:', user);
        isAdmin = (user.publicMetadata as { role?: string }).role?.toLowerCase() === 'admin';
      }

      if (!isAdmin) {
        const client = await clerkClient();
        console.log('User is not an admin. Public Metadata:', {
          sessionClaims: sessionClaims?.publicMetadata,
          userData: (await client.users.getUser(authState.userId)).publicMetadata,
        });
        // Redirect to home page instead of returning 403
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (error) {
      console.error('Error in middleware:', error);
      return new NextResponse('Authentication error', { status: 500 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/studio/:path*',
  ],
};