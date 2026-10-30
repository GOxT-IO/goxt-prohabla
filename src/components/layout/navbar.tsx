"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { title: "Empleos", href: "/empleos" },
  { title: "Empresas", href: "/empresas" },
  { title: "Agenda", href: "/agenda" },
  { title: "Eventos", href: "/eventos" },
  { title: "Blog", href: "/blog" },
  { title: "Contacto", href: "/contacto" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const LogoLockup = () => (
  <Link href="/" className="flex shrink-0 items-center" aria-label="Prohabla, ir al inicio">
    <Image
      src="/colaboran-trimmed/Prohabla.png"
      alt="Prohabla"
      width={140}
      height={46}
      style={{ width: "auto" }}
      className="h-9 w-auto object-contain"
      priority
    />
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-16 md:h-18">
        <LogoLockup />

        <nav aria-label="Principal" className="max-lg:hidden">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition hover:bg-muted/60 hover:text-navy",
                      active ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="h-10 rounded-full px-4 max-sm:hidden">
            <Link href="/empresas">Publicar vacante</Link>
          </Button>
          <Button asChild className="h-10 rounded-full px-4 max-sm:hidden">
            <Link href="/postulantes">Registrar mi CV</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="rounded-full border border-border p-2 lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent showCloseButton={false} side="right" className="w-full border-l-0 p-0 sm:w-96">
              <div className="flex items-center justify-between p-6">
                <LogoLockup />
                <SheetClose className="rounded-full border border-border p-2.5" aria-label="Cerrar menú">
                  <X className="size-4" aria-hidden />
                </SheetClose>
              </div>
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <nav aria-label="Menú móvil" className="flex flex-col gap-10 overflow-y-auto px-6 pb-6">
                <ul className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className="text-2xl font-semibold tracking-tight text-navy aria-[current=page]:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <Button asChild className="h-12 rounded-full text-base">
                    <Link href="/postulantes" onClick={() => setIsOpen(false)}>Registrar mi CV</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-full text-base">
                    <Link href="/empresas" onClick={() => setIsOpen(false)}>Publicar vacante</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
