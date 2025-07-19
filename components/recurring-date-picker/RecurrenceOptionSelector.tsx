"use client"

import type React from "react"

import { useRecurringDatePickerStore } from "@/lib/store"
import type { RecurrenceType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, RotateCcw, Repeat } from "lucide-react"

const recurrenceOptions: { type: RecurrenceType; label: string; icon: React.ReactNode }[] = [
  { type: "daily", label: "Daily", icon: <Clock className="h-4 w-4" /> },
  { type: "weekly", label: "Weekly", icon: <Calendar className="h-4 w-4" /> },
  { type: "monthly", label: "Monthly", icon: <RotateCcw className="h-4 w-4" /> },
  { type: "yearly", label: "Yearly", icon: <Repeat className="h-4 w-4" /> },
]

export default function RecurrenceOptionSelector() {
  const { pattern, setPattern } = useRecurringDatePickerStore()

  const handleRecurrenceTypeChange = (type: RecurrenceType) => {
    setPattern({ type })
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Recurrence Type</label>
      <div className="grid grid-cols-2 gap-2">
        {recurrenceOptions.map(({ type, label, icon }) => (
          <Button
            key={type}
            variant={pattern.type === type ? "default" : "outline"}
            onClick={() => handleRecurrenceTypeChange(type)}
            className="flex items-center gap-2 justify-start"
          >
            {icon}
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
