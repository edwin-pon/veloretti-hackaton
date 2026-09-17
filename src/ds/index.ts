// Side-effect imports, evaluated top to bottom: React must land on globalThis
// before the bundle runs, so do not reorder or merge these two lines.
import './react-global'
import './ds-bundle.js'

import type { ComponentType, ReactNode } from 'react'

type Tone = 'mint' | 'sky' | 'purple' | 'navy' | 'neutral' | 'warning' | 'error' | 'success'

export interface BadgeProps { tone?: Tone; children?: ReactNode }
export interface SpinnerProps { size?: number; tone?: Tone }
export interface ProgressBarProps { value?: number; max?: number; showValue?: boolean; label?: string }
export interface AlertBannerProps { variant?: 'info' | 'success' | 'warning' | 'error'; title?: string; children?: ReactNode }
export interface AvatarProps { name?: string; size?: number; tone?: Tone; src?: string }
export interface StepperProps { steps?: string[]; current?: number }
export interface TextInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  multiline?: boolean
  rows?: number
  type?: string
  disabled?: boolean
}
export interface SelectProps {
  value?: string
  onChange?: (value: string) => void
  options?: Array<string | { label: string; value: string }>
  placeholder?: string
}
export interface ToggleProps { checked?: boolean; onChange?: (checked: boolean) => void; label?: string; disabled?: boolean }

interface DsNamespace {
  Badge: ComponentType<BadgeProps>
  Spinner: ComponentType<SpinnerProps>
  ProgressBar: ComponentType<ProgressBarProps>
  AlertBanner: ComponentType<AlertBannerProps>
  Avatar: ComponentType<AvatarProps>
  Stepper: ComponentType<StepperProps>
  TextInput: ComponentType<TextInputProps>
  Select: ComponentType<SelectProps>
  Toggle: ComponentType<ToggleProps>
  __errors?: unknown[]
}

const ds = (globalThis as unknown as { DatalabDesignSystem_adceb3?: DsNamespace })
  .DatalabDesignSystem_adceb3

if (!ds) {
  throw new Error('Datalab design system bundle failed to register on the global scope')
}
if (ds.__errors?.length) {
  console.warn('[ds] some components failed to evaluate', ds.__errors)
}

export const Badge = ds.Badge
export const Spinner = ds.Spinner
export const ProgressBar = ds.ProgressBar
export const AlertBanner = ds.AlertBanner
export const Avatar = ds.Avatar
export const Stepper = ds.Stepper
export const TextInput = ds.TextInput
export const Select = ds.Select
export const Toggle = ds.Toggle
