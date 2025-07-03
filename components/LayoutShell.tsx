"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession } from "@/components/AuthProvider";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AvatarDropdown } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

function TopNav() {
  const { theme, setTheme } = useTheme();
  const session = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/marketplace?q=${encodeURIComponent(search)}`);
  }

  useEffect(() => {
    if (!search) return;
    if (debounce) clearTimeout(debounce);
    setDebounce(setTimeout(() => {
      router.push(`/marketplace?q=${encodeURIComponent(search)}`);
    }, 500));
    // eslint-disable-next-line
  }, [search]);

  // Three-way theme toggle: dark -> light -> white
  function handleThemeToggle() {
    let nextTheme;
    if (theme === "dark") nextTheme = "light";
    else if (theme === "light") nextTheme = "white";
    else nextTheme = "dark";
    setTheme(nextTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    }
  }

  function getThemeIcon() {
    if (theme === "dark") return "🌙";
    if (theme === "light") return "☀️";
    return "⬜"; // white mode icon
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-opacity-80 backdrop-blur-md">
      <a href="/marketplace" className="font-bold text-xl tracking-tight">
        <img src="/placeholder-logo.svg" alt="ReviveForge logo" className="inline h-8 w-auto align-middle mr-2" />
        ReviveForge
      </a>
      <form onSubmit={onSearch} className="flex-1 mx-4 max-w-lg">
        <input
          className="w-full rounded bg-gray-900 px-3 py-1 text-sm text-white placeholder-gray-400"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search projects"
        />
      </form>
      <div className="flex items-center gap-2">
        {mounted && (
          <Button variant="ghost" aria-label="Toggle theme" onClick={handleThemeToggle}>{getThemeIcon()}</Button>
        )}
        {session ? <AvatarDropdown /> : <Button asChild variant="outline"><a href="/login">Log in</a></Button>}
      </div>
    </header>
  );
}

function SideNav() {
  const session = useSession();
  if (!session) return null;
  return (
    <aside className="hidden md:flex flex-col w-56 bg-gray-950 border-r border-gray-800 p-4 gap-2" role="navigation" aria-label="Sidebar navigation">
      <a href="/dashboard" className="py-2 px-3 rounded hover:bg-gray-800">Dashboard</a>
      <a href="/marketplace" className="py-2 px-3 rounded hover:bg-gray-800">Marketplace</a>
      <a href="/favorites" className="py-2 px-3 rounded hover:bg-gray-800">Favorites</a>
      <a href="/pricing" className="py-2 px-3 rounded hover:bg-gray-800">Pricing</a>
      <a href="/settings" className="py-2 px-3 rounded hover:bg-gray-800">Settings</a>
    </aside>
  );
}

function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  if (!session) return null;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" aria-label="Open navigation menu">☰</Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-gray-950">
        <nav className="flex flex-col gap-2 p-4" role="navigation" aria-label="Mobile navigation">
          <a href="/dashboard" className="py-2 px-3 rounded hover:bg-gray-800">Dashboard</a>
          <a href="/marketplace" className="py-2 px-3 rounded hover:bg-gray-800">Marketplace</a>
          <a href="/favorites" className="py-2 px-3 rounded hover:bg-gray-800">Favorites</a>
          <a href="/pricing" className="py-2 px-3 rounded hover:bg-gray-800">Pricing</a>
          <a href="/settings" className="py-2 px-3 rounded hover:bg-gray-800">Settings</a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function Footer() {
  return (
    <footer className="w-full py-4 text-center text-xs text-gray-400 border-t border-gray-800 flex flex-col items-center gap-2">
      <span>© ReviveForge {new Date().getFullYear()}</span>
      <span className="flex gap-2">
        <a href="https://twitter.com/" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
        <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer">💻</a>
      </span>
    </footer>
  );
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <div className="min-h-screen flex flex-col bg-gray-950 text-white dark:bg-black">
        <TopNav />
        <MobileDrawer />
        <div className="flex flex-1">
          <SideNav />
          <main className="flex-1 min-w-0 flex flex-col">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
