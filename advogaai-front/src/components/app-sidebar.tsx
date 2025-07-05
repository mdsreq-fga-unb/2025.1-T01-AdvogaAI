'use client';

import * as React from 'react';
import {
  Users,
  FileText,
  Calendar,
  Settings,
  Home,
  Briefcase,
  HelpCircle,
  ChevronUp,
  User2,
  File,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import toast from 'react-hot-toast';
import logoutUser from '@/services/auth/logoutUser';
import { useRouter, usePathname } from 'next/navigation';

// Menu items
export const pathsData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Clientes',
      url: '/dashboard/clientes',
      icon: Users,
    },
    {
      title: 'Modelos de Documentos',
      url: '/dashboard/modelo-documentos',
      icon: File,
    },
    {
      title: 'Documentos Gerados',
      url: '/dashboard/documentos-gerados',
      icon: FileText,
    },
    {
      title: 'Processos',
      url: '/dashboard/processos',
      icon: Calendar,
    },
  ],
  navSecondary: [
    {
      title: 'Configurações',
      url: '/dashboard/configuracoes',
      icon: Settings,
    },
    {
      title: 'Ajuda',
      url: '/dashboard/ajuda',
      icon: HelpCircle,
    },
  ],
};

async function handleLogout() {
  try {
    await logoutUser();
  } catch (error) {
    console.error(error);
    toast.error('Um erro desconhecido ocorreu ao fazer o logout!');
  }
}

function getInitials(fullName: string) {
  const names = fullName.trim().split(/\s+/);

  if (names.length === 0 || names[0] === '') {
    return 'XX';
  }

  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  const firstNameInitial = names[0].charAt(0);
  const secondNameInitial = names[1].charAt(0);

  return `${firstNameInitial}${secondNameInitial}`.toUpperCase();
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = React.useState<string>('Advogado');
  const [userEmail, setUserEmail] = React.useState<string>('');

  React.useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedName) {
      setUserName(storedName);
    }
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-900">
                  <Briefcase className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AdvLaw</span>
                  <span className="truncate text-xs">
                    Escritório de Advocacia
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {pathsData.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === '/dashboard'
                        ? pathname === item.url
                        : pathname.startsWith(item.url)
                    }
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-cyan-500 text-slate-900">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userName}</span>
                    <span className="truncate text-xs">{userEmail}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-slate-800 border-slate-700"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem
                  onClick={() => router.push('perfil')}
                  className="text-slate-300 cursor-pointer hover:bg-slate-700 hover:text-white"
                >
                  <User2 className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void handleLogout()}
                  className="text-slate-300 cursor-pointer hover:bg-slate-700 hover:text-white"
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
