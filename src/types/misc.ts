export interface ISidebarMenuItem {
  name: string;
  link: string;
  icon: (isActive: boolean) => React.ReactNode;
}
