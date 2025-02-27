'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme, type ThemeProviderProps } from 'next-themes'

/**
 * RecycleX theme configuration
 * Enhanced theme provider with system preference detection and persistence
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

/**
 * Custom hook for theme management with RecycleX-specific operations
 */
export function useRecycleXTheme() {
  const { theme, setTheme, systemTheme } = useTheme()
  
  // Check if current theme matches the user's preferred color scheme
  const isSystemPreference = theme === 'system' || theme === systemTheme
  
  // Toggle between light and dark themes
  const toggleTheme = React.useCallback(() => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [theme, setTheme])

  return {
    theme,
    setTheme,
    systemTheme,
    isSystemPreference,
    toggleTheme,
    isDark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  }
}

/**
 * Theme toggle button component to be used across the application
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, isDark } = useRecycleXTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md hover:bg-accent transition-colors ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  )
}

// Simple icon components
function SunIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}