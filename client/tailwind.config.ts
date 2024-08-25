import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'custom-background': 'var(--color-background)',
        'custom-section-primary': 'var(--color-section-primary)',
        'custom-section-secondary': 'var(--color-section-secondary)',
        'custom-primary': 'var(--color-primary)',
        'custom-primary-light': 'var(--color-primary-light)',
        'custom-primary-dark': 'var(--color-primary-dark)',
        'custom-secondary': 'var(--color-secondary)',
        'custom-secondary-light': 'var(--color-secondary-light)',
        'custom-secondary-dark': 'var(--color-secondary-dark)',
        'custom-light': 'var(--color-light)',
        'custom-light-2': 'var(--color-light-2)',
        'custom-white': 'var(--color-white)',
        'custom-black': 'var(--color-black)',
        'custom-black-2': 'var(--color-black-2)',
        'custom-dark': 'var(--color-dark)',
        'custom-gray': 'var(--color-gray)',
        'custom-gray-2': 'var(--color-gray-2)',
        'custom-gray-3': 'var(--color-gray-3)',
        'custom-gray-4': 'var(--color-gray-4)',
        'custom-card': 'var(--color-card)',
        'custom-gradient-main': 'var(--color-gradient-main)',
        'custom-gradient-1': 'var(--color-gradient-1)',
        'custom-gradient-2': 'var(--color-gradient-2)',
        'custom-gradient-3': 'var(--color-gradient-3)',
        'custom-gradient-4': 'var(--color-gradient-4)',
        'custom-nav-scroll-bg': 'var(--color-nav-scroll-bg)',
        'custom-nav-unscroll-bg': 'var(--color-nav-unscroll-bg)',
        'custom-nav-link-bg': 'var(--color-nav-link-bg)',
        'custom-nav-scroll-bg-alt': 'var(--color-nav-scroll-bg-alt)',
        'custom-nav-unscroll-bg-alt': 'var(--color-nav-unscroll-bg-alt)',
        'custom-nav-link-bg-alt': 'var(--color-nav-link-bg-alt)',
        'custom-text-heading': 'var(--color-text-heading)',
        'custom-text-main': 'var(--color-text-main)',
        'custom-text-black': 'var(--color-text-black)',
        'custom-text-black-secondary': 'var(--color-text-black-secondary)',
        'custom-btn-secondary': 'var(--color-btn-secondary)',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config