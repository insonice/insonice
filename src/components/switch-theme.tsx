"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SwitchTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
