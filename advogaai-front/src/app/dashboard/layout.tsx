'use client';
import { AppSidebar, pathsData } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeProvider } from '@/components/theme-provider';

const breadcrumbNameMap: { [key: string]: string } = [
  ...pathsData.navMain,
  ...pathsData.navSecondary,
].reduce(
  (map, item) => {
    const key = item.url.split('/').pop() || item.url;
    map[key] = item.title;
    return map;
  },
  {} as { [key: string]: string },
);

breadcrumbNameMap['create'] = 'Criar Modelo de Documento';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="dark">
        <SidebarProvider defaultOpen={true}>
          <AppSidebar variant="inset" />
          <SidebarInset
            className={cn(
              'transition-[margin] duration-200',
              'md:peer-data-[state=expanded]:ml-[--sidebar-width]',
              'md:peer-data-[state=collapsed]:ml-[calc(var(--sidebar-width-icon)+theme(spacing.4))]',
            )}
          >
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 bg-slate-800 px-4">
              <SidebarTrigger className="-ml-1 text-slate-300 cursor-pointer hover:text-white" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4 bg-slate-600"
              />

              <Breadcrumb>
                <BreadcrumbList>
                  {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    const displayName =
                      breadcrumbNameMap[segment] ||
                      segment.charAt(0).toUpperCase() + segment.slice(1);

                    return (
                      <React.Fragment key={href}>
                        <BreadcrumbSeparator className="text-slate-500" />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage className="text-white">
                              {displayName}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              asChild
                              className="text-slate-300 hover:text-white"
                            >
                              <Link href={href}>{displayName}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            <main className="flex flex-1 flex-col gap-4 p-6 bg-slate-900 min-h-[calc(100vh-4rem)]">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
}
