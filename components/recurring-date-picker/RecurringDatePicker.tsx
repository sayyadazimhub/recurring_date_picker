"use client"

import React from "react"

import { useRecurringDatePickerStore } from "@/lib/store"
import type { RecurrencePattern } from "@/lib/types"
import RecurrenceOptionSelector from "./RecurrenceOptionSelector"
import CustomPatternConfigurator from "./CustomPatternConfigurator"
import DateRangePicker from "./DateRangePicker"
import CalendarPreview from "./CalendarPreview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface RecurringDatePickerProps {
  onRecurrenceChange?: (pattern: RecurrencePattern) => void
  className?: string
}

export default function RecurringDatePicker({ onRecurrenceChange, className = "" }: RecurringDatePickerProps) {
  const { pattern, isPreviewVisible, togglePreview } = useRecurringDatePickerStore()

  // Notify parent component of changes
  React.useEffect(() => {
    if (onRecurrenceChange) {
      onRecurrenceChange(pattern)
    }
  }, [pattern, onRecurrenceChange])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Configure Recurring Dates</h2>
        <Button variant="outline" size="sm" onClick={togglePreview} className="flex items-center gap-2 bg-transparent">
          {isPreviewVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {isPreviewVisible ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recurrence Pattern</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RecurrenceOptionSelector />
              <CustomPatternConfigurator />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
            </CardHeader>
            <CardContent>
              <DateRangePicker />
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        {isPreviewVisible && (
          <div className="space-y-6">
            <CalendarPreview />
          </div>
        )}
      </div>
    </div>
  )
}
