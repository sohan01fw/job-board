import { Header } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import ThemeProviderWrapper from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import { getCachedUser } from "@/lib/redis";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function HeaderWrapper() {
  const user = await getCachedUser();
  return (
    <Header
      email={user?.email}
      img={user?.img || ""}
      uId={user?.id}
    />
  );
}

function HeaderSkeleton() {
  return (
    <div className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProviderWrapper>
      <ReactQueryProvider>
        <TooltipProvider>
          <div className="min-h-screen grid grid-cols-[80px_1fr] lg:grid-cols-[250px_1fr]">
            {/* Sidebar always visible, left */}
            <aside className="sticky top-0 left-0 h-screen z-50">
              <Sidebar />
            </aside>

            {/* Right side: header + content stacked */}
            <div className="flex flex-col min-h-screen">
              {/* Header sticky top */}
              <header className="sticky top-0 z-40 bg-white">
                <Suspense fallback={<HeaderSkeleton />}>
                  <HeaderWrapper />
                </Suspense>
              </header>

              {/* Children */}
              <main className="flex-1">
                {children}
              </main>
              <Toaster richColors />
            </div>
          </div>
        </TooltipProvider>
      </ReactQueryProvider>
    </ThemeProviderWrapper>
  );
}
