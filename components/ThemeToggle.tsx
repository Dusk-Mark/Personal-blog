"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 clay-button flex items-center justify-center bg-muted/50">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 clay-button flex items-center justify-center bg-card hover:bg-muted/50 transition-all duration-300"
      aria-label="切换主题"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-sunshine transition-all duration-500 rotate-0 scale-100" />
      ) : (
        <Moon className="w-5 h-5 text-primary transition-all duration-500 rotate-0 scale-100" />
      )}
    </button>
  );
}
