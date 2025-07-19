"use client"

import { useRecurringDatePickerStore } from "@/lib/store"
import type { DayOfWeek, WeekOfMonth } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const daysOfWeek: { value: DayOfWeek; label: string }[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
]

const weeksOfMonth: { value: WeekOfMonth; label: string }[] = [
  { value: "first", label: "First" },
  { value: "second", label: "Second" },
  { value: "third", label: "Third" },
  { value: "fourth", label: "Fourth" },
  { value: "last", label: "Last" },
]

export default function CustomPatternConfigurator() {
  const { pattern, setPattern } = useRecurringDatePickerStore()

  const handleIntervalChange = (interval: number) => {
    setPattern({ interval: Math.max(1, interval) })
  }

  const handleDayOfWeekToggle = (day: DayOfWeek) => {
    const currentDays = pattern.daysOfWeek || []
    const newDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day]

    setPattern({ daysOfWeek: newDays })
  }

  const handleDayOfMonthChange = (dayOfMonth: number) => {
    setPattern({ dayOfMonth: Math.max(1, Math.min(31, dayOfMonth)) })
  }

  const handleComplexMonthlyChange = (weekOfMonth: WeekOfMonth, dayOfWeekInMonth: DayOfWeek) => {
    setPattern({ weekOfMonth, dayOfWeekInMonth })
  }

  return (
    <div className="space-y-4">
      {/* Interval Configuration */}
      <div className="space-y-2">
        <Label htmlFor="interval">
          Repeat every {pattern.interval} {pattern.type}
          {pattern.interval !== 1 ? "s" : ""}
        </Label>
        <Input
          id="interval"
          type="number"
          min="1"
          max="365"
          value={pattern.interval}
          onChange={(e) => handleIntervalChange(Number.parseInt(e.target.value) || 1)}
          className="w-20"
        />
      </div>

      {/* Weekly Configuration */}
      {pattern.type === "weekly" && (
        <div className="space-y-2">
          <Label>Days of the week</Label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(({ value, label }) => (
              <Button
                key={value}
                variant={pattern.daysOfWeek?.includes(value) ? "default" : "outline"}
                size="sm"
                onClick={() => handleDayOfWeekToggle(value)}
              >
                {label.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Configuration */}
      {pattern.type === "monthly" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Monthly Pattern</Label>
            <div className="space-y-3">
              {/* Simple day of month */}
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="monthlyPattern"
                  checked={!pattern.weekOfMonth}
                  onChange={() => setPattern({ weekOfMonth: undefined, dayOfWeekInMonth: undefined })}
                  className="w-4 h-4"
                />
                <Label className="flex items-center gap-2">
                  On day
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    value={pattern.dayOfMonth || new Date(pattern.startDate).getDate()}
                    onChange={(e) => handleDayOfMonthChange(Number.parseInt(e.target.value) || 1)}
                    className="w-16"
                  />
                  of the month
                </Label>
              </div>

              {/* Complex pattern */}
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="monthlyPattern"
                  checked={!!pattern.weekOfMonth}
                  onChange={() => setPattern({ weekOfMonth: "first", dayOfWeekInMonth: "monday" })}
                  className="w-4 h-4"
                />
                <Label className="flex items-center gap-2">
                  On the
                  <Select
                    value={pattern.weekOfMonth || "first"}
                    onValueChange={(value: WeekOfMonth) =>
                      handleComplexMonthlyChange(value, pattern.dayOfWeekInMonth || "monday")
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {weeksOfMonth.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={pattern.dayOfWeekInMonth || "monday"}
                    onValueChange={(value: DayOfWeek) =>
                      handleComplexMonthlyChange(pattern.weekOfMonth || "first", value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
