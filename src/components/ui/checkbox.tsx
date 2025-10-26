"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200",
            checked && "bg-blue-600 border-blue-600",
            disabled && "opacity-50 cursor-not-allowed",
            "cursor-pointer hover:border-gray-400 dark:hover:border-gray-500",
            className
          )}
        >
          {checked && (
            <Check className="h-3 w-3 text-white" />
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }