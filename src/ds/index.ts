// Side-effect imports, evaluated top to bottom: React must land on globalThis
// before the bundle runs, so do not reorder or merge these two lines.
import './react-global'
import './ds-bundle.js'

import type { ComponentType, ReactNode } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  uppercase?: boolean
  as?: 'button' | 'a'
  href?: string
  children?: ReactNode
}

export type BadgeVariant = 'neutral' | 'ink' | 'outline' | 'accent'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  pill?: boolean
  children?: ReactNode
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  children?: ReactNode
}

export interface OptionCardProps {
  label: string
  note?: string
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

interface DsNamespace {
  Button: ComponentType<ButtonProps>
  Badge: ComponentType<BadgeProps>
  Input: ComponentType<InputProps>
  Select: ComponentType<SelectProps>
  OptionCard: ComponentType<OptionCardProps>
  __errors?: unknown[]
}

const ds = (globalThis as unknown as { VelorettiDesignSystem_ff4e7e?: DsNamespace })
  .VelorettiDesignSystem_ff4e7e

if (!ds) {
  throw new Error('Veloretti design system bundle failed to register on the global scope')
}
if (ds.__errors?.length) {
  console.warn('[ds] some components failed to evaluate', ds.__errors)
}

export const Button = ds.Button
export const Badge = ds.Badge
export const Input = ds.Input
export const Select = ds.Select
export const OptionCard = ds.OptionCard

export * from './primitives'
