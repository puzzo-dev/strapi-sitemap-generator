import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system" | "auto"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: "dark" | "light"
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Function to determine if current time is night time (6:30 PM to 6:30 AM)
function isNightTime(): boolean {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours + minutes / 60

  // Night time: 18:30 (6:30 PM) to 6:30 (6:30 AM)
  const nightStart = 18.5 // 6:30 PM
  const nightEnd = 6.5    // 6:30 AM

  return currentTime >= nightStart || currentTime < nightEnd
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    const root = window.document.documentElement
    let resolvedTheme: "dark" | "light"

    root.classList.remove("light", "dark")

    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    } else if (theme === "auto") {
      resolvedTheme = isNightTime() ? "dark" : "light"
    } else {
      resolvedTheme = theme
    }

    root.classList.add(resolvedTheme)
    setActualTheme(resolvedTheme)
  }, [theme])

  // Auto theme time checking
  useEffect(() => {
    if (theme !== "auto") return

    const checkTime = () => {
      const root = window.document.documentElement
      const newTheme = isNightTime() ? "dark" : "light"

      if (newTheme !== actualTheme) {
        root.classList.remove("light", "dark")
        root.classList.add(newTheme)
        setActualTheme(newTheme)
      }
    }

    // Check every minute
    const interval = setInterval(checkTime, 60000)

    // Also check when the component mounts
    checkTime()

    return () => clearInterval(interval)
  }, [theme, actualTheme])

  const value = {
    theme,
    actualTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}