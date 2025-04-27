import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#121212",
        foreground: "#f8f8f8",
        primary: {
          DEFAULT: "#6b47f5",
          foreground: "#f8f8f8"
        },
        secondary: {
          DEFAULT: "#4a90e2",
          foreground: "#f8f8f8"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "#2a2a2a",
          foreground: "#a0a0a0"
        },
        accent: {
          DEFAULT: "#333333",
          foreground: "#f8f8f8"
        },
        popover: {
          DEFAULT: "#1a1a1a",
          foreground: "#f8f8f8"
        },
        card: {
          DEFAULT: "#1a1a1a",
          foreground: "#f8f8f8"
        },
        network: {
          blue: "#121212",
          lightBlue: "#4a90e2",
          highlight: "#6b47f5"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'pulse-ping': {
          '0%': { 
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(100, 255, 218, 0.7)' 
          },
          '70%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 10px rgba(100, 255, 218, 0)' 
          },
          '100%': { 
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(100, 255, 218, 0)' 
          }
        },
        'text-shimmer': {
          '0%, 100%': { 
            backgroundPosition: '-100% 0' 
          },
          '50%': { 
            backgroundPosition: '100% 0' 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'pulse-ping': 'pulse-ping 2s infinite',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
