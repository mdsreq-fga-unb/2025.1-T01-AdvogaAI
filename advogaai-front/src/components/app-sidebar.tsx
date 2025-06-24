'use client';

import type * as React from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Menu items
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: Home,
    },
    {
      title: 'Clientes',
      url: '/dashboard/client',
      icon: Users,
      isActive: true,
    },
    {
      title: 'Documentos',
      url: '/dashboard/processos',
      icon: FileText,
    },
    {
      title: 'Processos',
      url: '/dashboard/agenda',
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              <a href="#">
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
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
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
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback className="rounded-lg bg-cyan-500 text-slate-900">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Advogado</span>
                    <span className="truncate text-xs">advogado@email.com</span>
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
                <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
                  <User2 className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
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
