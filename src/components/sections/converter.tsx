"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export function Converter() {
    return (
        <SidebarProvider>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <div className="flex gap-4 md:gap-6">
                    <Sidebar className="md:sticky md:top-20 lg:top-24 max-h-[calc(100vh-5rem-2rem)] lg:max-h-[calc(100vh-6rem-2rem)] overflow-hidden">
                        <div className="flex flex-col h-auto max-h-[inherit]">
                            <SidebarHeader>
                                <span className="text-sm font-medium">Tools</span>
                            </SidebarHeader>
                            <SidebarSeparator />
                            <div className="flex-1 min-h-0 overflow-auto">
                                <SidebarContent>
                                    <SidebarGroup>
                                        <SidebarGroupLabel>Converters</SidebarGroupLabel>
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton>JSON Formatter</SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton>Base64 Encoder</SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton>Color Picker</SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </SidebarGroup>
                                </SidebarContent>
                            </div>
                            <SidebarFooter />
                        </div>
                    </Sidebar>
                    {/* Optional rail for desktop resize/hover toggle */}
                    

                    <SidebarInset className="min-w-0 flex-1">
                        <section className="p-4">
                            <div className="md:hidden mb-4 flex items-center gap-2">
                                <SidebarTrigger />
                                <span className="text-sm text-muted-foreground">Open tools</span>
                            </div>
                            <h1 className="text-lg font-semibold">Converter</h1>
                            <p className="text-sm text-muted-foreground">Select a tool from the sidebar.</p>
                        </section>
                    </SidebarInset>
                </div>
            </div>
        </SidebarProvider>
    );
}