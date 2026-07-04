"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  MODULE_CATEGORY_LABELS,
  MODULE_CATEGORY_ORDER,
  type ProductDef,
} from "@/config/products";
import { isRoleAllowed } from "@/config/roles";
import { useRole } from "./role-provider";
import { useSidebar } from "./sidebar-provider";

interface SidebarProps {
  product: ProductDef;
  locale: string;
}

const ACCENT: Record<string, string> = {
  hospital: "text-product-hospital",
  clinic: "text-product-clinic",
  pharmacy: "text-product-pharmacy",
  laboratory: "text-product-laboratory",
  imaging: "text-product-imaging",
  cyshop: "text-product-cyshop",
  erp: "text-product-erp",
};

const ACCENT_BG: Record<string, string> = {
  hospital: "bg-product-hospital/15 text-product-hospital",
  clinic: "bg-product-clinic/15 text-product-clinic",
  pharmacy: "bg-product-pharmacy/15 text-product-pharmacy",
  laboratory: "bg-product-laboratory/15 text-product-laboratory",
  imaging: "bg-product-imaging/15 text-product-imaging",
  cyshop: "bg-product-cyshop/15 text-product-cyshop",
  erp: "bg-product-erp/15 text-product-erp",
};

export function Sidebar({ product, locale }: SidebarProps) {
  const { roleId } = useRole();
  const { collapsed, toggle } = useSidebar();
  const pathname = usePathname();

  const visibleModules = product.modules.filter((m) => isRoleAllowed(m.roles, roleId));

  const groups = MODULE_CATEGORY_ORDER.map((cat) => ({
    cat,
    label: MODULE_CATEGORY_LABELS[cat],
    items: visibleModules.filter((m) => m.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <TooltipProvider delayDuration={200} disableHoverableContent>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 68 : 268 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="sticky top-0 z-30 flex h-dvh shrink-0 flex-col border-e border-border bg-surface"
      >
        {/* brand */}
        <div className="flex items-center gap-2 border-b border-border/60 px-3 py-3.5">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
              ACCENT_BG[product.accent] ?? "bg-primary/15 text-primary"
            )}
          >
            <product.icon className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold leading-tight">
                {product.title}
              </div>
              <div className="truncate text-2xs uppercase tracking-wide text-muted-foreground">
                CyberCom Suite
              </div>
            </div>
          )}
        </div>

        {/* nav */}
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-4 px-2 py-3">
            {groups.map((g) => (
              <div key={g.cat} className="flex flex-col gap-1">
                {!collapsed && (
                  <div className="px-2 pb-1 pt-1 text-2xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                    {g.label}
                  </div>
                )}
                {g.items.map((m) => {
                  const href =
                    m.slug === "dashboard"
                      ? `/${locale}/${product.slug}`
                      : `/${locale}/${product.slug}/${m.slug}`;
                  const active =
                    (m.slug === "dashboard" && pathname === `/${locale}/${product.slug}`) ||
                    (m.slug !== "dashboard" &&
                      pathname?.startsWith(`/${locale}/${product.slug}/${m.slug}`));
                  const Icon = m.icon;
                  const item = (
                    <Link
                      key={m.slug}
                      href={href}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                        active
                          ? cn("bg-surface-raised text-foreground", ACCENT[product.accent])
                          : "text-muted-foreground hover:bg-surface-raised/60 hover:text-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", active && ACCENT[product.accent])} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{m.title}</span>
                          {m.badge ? (
                            <Badge
                              variant={m.badge === "new" ? "info" : m.badge === "beta" ? "warning" : "default"}
                              size="sm"
                              className="ms-auto"
                            >
                              {typeof m.badge === "string" ? m.badge : String(m.badge)}
                            </Badge>
                          ) : null}
                        </>
                      )}
                    </Link>
                  );

                  return collapsed ? (
                    <Tooltip key={m.slug}>
                      <TooltipTrigger asChild>{item}</TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center gap-2">
                        {m.title}
                        {m.badge ? (
                          <Badge variant="info" size="sm">
                            {String(m.badge)}
                          </Badge>
                        ) : null}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    item
                  );
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* collapse */}
        <button
          onClick={toggle}
          className="flex items-center justify-center gap-2 border-t border-border/60 px-3 py-2.5 text-2xs uppercase tracking-wide text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4 rtl-flip" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4 rtl-flip" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}
