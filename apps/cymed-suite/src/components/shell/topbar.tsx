"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Calendar,
  ChevronDown,
  Command,
  Globe,
  Grid3x3,
  Search,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCTS, type ProductDef } from "@/config/products";
import { ROLES } from "@/config/roles";
import { LOCALE_META, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useRole } from "./role-provider";

interface TopbarProps {
  product: ProductDef;
  locale: Locale;
}

const ACCENT_BG: Record<string, string> = {
  hospital: "bg-product-hospital/15 text-product-hospital",
  clinic: "bg-product-clinic/15 text-product-clinic",
  pharmacy: "bg-product-pharmacy/15 text-product-pharmacy",
  laboratory: "bg-product-laboratory/15 text-product-laboratory",
  imaging: "bg-product-imaging/15 text-product-imaging",
  cyshop: "bg-product-cyshop/15 text-product-cyshop",
  erp: "bg-product-erp/15 text-product-erp",
};

function useNow(locale: Locale) {
  const [now, setNow] = React.useState<Date | null>(null);
  React.useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) return { date: "—", time: "—" };
  const dateFmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date: dateFmt.format(now), time: timeFmt.format(now) };
}

export function Topbar({ product, locale }: TopbarProps) {
  const { roleId, setRoleId } = useRole();
  const router = useRouter();
  const pathname = usePathname();
  const { date, time } = useNow(locale);
  const currentRole = ROLES.find((r) => r.id === roleId) ?? ROLES[0];

  const switchLocale = (next: Locale) => {
    if (!pathname) return;
    const parts = pathname.split("/");
    if (parts[1] === "en" || parts[1] === "ar") {
      parts[1] = next;
    } else {
      parts.splice(1, 0, next);
    }
    router.replace(parts.join("/") || `/${next}`);
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/70 bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      {/* Left: date + product switcher */}
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-md border border-border/60 bg-surface-raised px-2.5 py-1.5 text-2xs md:flex">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium tabular-nums text-foreground">{date}</span>
          <Separator orientation="vertical" className="h-3" />
          <span className="tabular-nums text-muted-foreground">{time}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Grid3x3 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Products</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Switch product</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PRODUCTS.map((p) => {
              const Icon = p.icon;
              return (
                <DropdownMenuItem key={p.slug} asChild>
                  <Link href={`/${locale}/${p.slug}`} className="gap-2.5">
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded",
                        ACCENT_BG[p.accent]
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1">{p.title}</span>
                    {p.slug === product.slug ? (
                      <Badge variant="muted" size="sm">
                        Open
                      </Badge>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Middle: product title + search */}
      <div className="flex flex-1 items-center gap-3">
        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${product.title}…`}
            className="w-full ps-8"
          />
          <kbd className="kbd absolute end-2 top-1/2 hidden -translate-y-1/2 md:inline-flex">
            <Command className="me-0.5 h-2.5 w-2.5" />K
          </kbd>
        </div>
      </div>

      {/* Right: lang, role, notify, avatar */}
      <div className="flex items-center gap-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">{locale}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={locale} onValueChange={(v) => switchLocale(v as Locale)}>
              {(["en", "ar"] as const).map((l) => (
                <DropdownMenuRadioItem key={l} value={l}>
                  {LOCALE_META[l].nativeLabel}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <currentRole.icon className={cn("h-3.5 w-3.5")} />
              <span className="text-xs font-medium">{currentRole.short}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Active role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={roleId} onValueChange={setRoleId}>
              {ROLES.map((r) => (
                <DropdownMenuRadioItem key={r.id} value={r.id}>
                  <div className="flex flex-1 items-center gap-2">
                    <r.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <div className="flex flex-1 flex-col leading-tight">
                      <span className="text-sm">{r.title}</span>
                      <span className="text-2xs text-muted-foreground">{r.department}</span>
                    </div>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute end-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive ring-2 ring-surface" />
        </Button>

        <Button variant="ghost" size="icon" className="text-accent">
          <Sparkles className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md p-1 pe-2 text-start transition-colors hover:bg-surface-raised">
              <Avatar>
                <AvatarFallback>DA</AvatarFallback>
              </Avatar>
              <div className="hidden leading-tight md:block">
                <div className="text-xs font-medium">Dr. Ahmed</div>
                <div className={cn("text-2xs", currentRole.color, "!bg-transparent !text-current opacity-80")}>
                  {currentRole.short} · {currentRole.department}
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Dr. Ahmed Al-Farid</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
