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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					25: '#F6FEFC',
					50: '#E8FDF7',
					100: '#D1FAF0',
					200: '#A7F6E2',
					300: '#78F2D3',
					400: '#4AEDC4',
					500: '#1DE9B6',
					600: '#13BF94',
					700: '#0E9070',
					800: '#09624C',
					900: '#052E24',
					950: '#021712',
					DEFAULT: '#1DE9B6',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				gray: {
					25: '#F9FBFA',
					50: '#F0F4F3',
					100: '#E2E9E7',
					200: '#C5D3D0',
					300: '#A8BDB8',
					400: '#8AA8A0',
					500: '#6F938A',
					600: '#57756D',
					700: '#425752',
					800: '#2C3A37',
					900: '#161D1B',
					950: '#0B0F0E'
				},
				'gray-secondary': {
					25: '#FCFCFC',
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					300: '#D6D6D6',
					400: '#A3A3A3',
					500: '#737373',
					600: '#525252',
					700: '#424242',
					800: '#292929',
					900: '#141414',
					950: '#0F0F0F'
				},
				destructive: {
					25: '#FFFBFA',
					50: '#FEF3F2',
					100: '#FEE4E2',
					200: '#FECDCA',
					300: '#FDA29B',
					400: '#F97066',
					500: '#F04438',
					600: '#D92D20',
					700: '#B42318',
					800: '#912018',
					900: '#7A271A',
					950: '#55160C',
					DEFAULT: '#F04438',
					foreground: '#FFFFFF'
				},
				warning: {
					25: '#FFFCF5',
					50: '#FFFAEB',
					100: '#FEF0C7',
					200: '#FEDF89',
					300: '#FEC84B',
					400: '#FDB022',
					500: '#F79009',
					600: '#DC6803',
					700: '#B54708',
					800: '#93370D',
					900: '#7A2E0E',
					950: '#4E1D09'
				},
				success: {
					25: '#F6FEF9',
					50: '#ECFDF3',
					100: '#DCFAE6',
					200: '#ABEFC6',
					300: '#75E0A7',
					400: '#47CD89',
					500: '#17B26A',
					600: '#079455',
					700: '#067647',
					800: '#085D3A',
					900: '#074D31',
					950: '#053321'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				krystal: {
					dark: '#0f172a',
					medium: '#1e293b',
					light: '#334155',
					primary: '#8b5cf6',
					secondary: '#a78bfa',
					accent: '#06b6d4',
					success: '#10b981',
					warning: '#f59e0b',
					error: '#ef4444'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1' 
					},
					'50%': { 
						opacity: '0.6' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
