"use client"

import { useRecurringDatePickerStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function DateRangePicker() {
  const { pattern, setPattern } = useRecurringDatePickerStore()
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setPattern({ startDate: date })
      setStartDateOpen(false)
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setPattern({ endDate: date })
      setEndDateOpen(false)
    }
  }

  const clearEndDate = () => {
    setPattern({ endDate: undefined })
  }

  return (
    <div className="space-y-4">
      {/* Start Date */}
      <div className="space-y-2">
        <Label>Start Date</Label>
        <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !pattern.startDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {pattern.startDate ? format(pattern.startDate, "PPP") : "Pick a start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={pattern.startDate} onSelect={handleStartDateChange} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <Label>End Date (Optional)</Label>
        <div className="flex gap-2">
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex-1 justify-start text-left font-normal",
                  !pattern.endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pattern.endDate ? format(pattern.endDate, "PPP") : "No end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={pattern.endDate}
                onSelect={handleEndDateChange}
                disabled={(date) => date < pattern.startDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {pattern.endDate && (
            <Button variant="outline" size="icon" onClick={clearEndDate} className="shrink-0 bg-transparent">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
