
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',  // Full HD
      '4xl': '2560px',  // QHD/1440p
      '5xl': '3840px',  // 4K UHD
      '6xl': '5120px',  // 5K
      '7xl': '7680px',  // 8K
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4k': '0.75rem', // Optimized for 4K displays
        '8k': '1rem',    // Optimized for 8K displays
      },
      fontSize: {
        '4k-xs': ['0.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        '4k-sm': ['1rem', { lineHeight: '1.375', letterSpacing: '-0.01em' }],
        '4k-base': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '4k-lg': ['1.25rem', { lineHeight: '1.625', letterSpacing: '-0.02em' }],
        '4k-xl': ['1.5rem', { lineHeight: '1.75', letterSpacing: '-0.02em' }],
        '4k-2xl': ['1.875rem', { lineHeight: '2', letterSpacing: '-0.025em' }],
        '4k-3xl': ['2.25rem', { lineHeight: '2.25', letterSpacing: '-0.025em' }],
        '4k-4xl': ['3rem', { lineHeight: '3', letterSpacing: '-0.03em' }],
        '4k-5xl': ['3.75rem', { lineHeight: '3.75', letterSpacing: '-0.03em' }],
        '4k-6xl': ['4.5rem', { lineHeight: '4.5', letterSpacing: '-0.035em' }],
        '4k-7xl': ['6rem', { lineHeight: '6', letterSpacing: '-0.035em' }],
        '4k-8xl': ['8rem', { lineHeight: '8', letterSpacing: '-0.04em' }],
        '4k-9xl': ['10rem', { lineHeight: '10', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '4k-1': '0.375rem',   // 6px at 4K
        '4k-2': '0.625rem',   // 10px at 4K
        '4k-3': '0.875rem',   // 14px at 4K
        '4k-4': '1.125rem',   // 18px at 4K
        '4k-5': '1.5rem',     // 24px at 4K
        '4k-6': '1.875rem',   // 30px at 4K
        '4k-8': '2.5rem',     // 40px at 4K
        '4k-10': '3.125rem',  // 50px at 4K
        '4k-12': '3.75rem',   // 60px at 4K
        '4k-16': '5rem',      // 80px at 4K
        '4k-20': '6.25rem',   // 100px at 4K
        '4k-24': '7.5rem',    // 120px at 4K
        '4k-32': '10rem',     // 160px at 4K
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        'ultra-sharp-fade': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(0.5rem) scale(0.98)',
            filter: 'blur(0.5px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)'
          },
        },
        'crisp-scale': {
          '0%': { transform: 'scale(0.95)', filter: 'blur(0.5px)' },
          '100%': { transform: 'scale(1)', filter: 'blur(0px)' },
        },
        'sharp-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 0.5rem rgba(59, 130, 246, 0.1)',
            filter: 'brightness(1)'
          },
          '50%': { 
            boxShadow: '0 0 1.5rem rgba(59, 130, 246, 0.3)',
            filter: 'brightness(1.05)'
          },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "width-expand": {
          "0%": { width: "0" },
          "100%": { width: "6rem" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "fade-in-down": "fade-in-down 0.7s ease-in-out",
        "fade-in": "fade-in 1s ease-in-out",
        "width-expand": "width-expand 1s ease-out forwards",
        "ultra-sharp-fade": "ultra-sharp-fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "crisp-scale": "crisp-scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "sharp-glow": "sharp-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
