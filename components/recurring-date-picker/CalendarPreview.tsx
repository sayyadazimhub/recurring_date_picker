"use client"

import { useRecurringDatePickerStore } from "@/lib/store"
import { formatRecurrenceRule } from "@/lib/recurrence-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { format, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarPreview() {
  const { pattern, previewDates } = useRecurringDatePickerStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const recurringDatesInMonth = previewDates.filter((date) => isSameMonth(date, currentMonth))

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const isRecurringDate = (date: Date) => {
    return previewDates.some((recurringDate) => isSameDay(recurringDate, date))
  }

  return (
    <div className="space-y-4">
      {/* Rule Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recurrence Rule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">{formatRecurrenceRule(pattern)}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Start: {format(pattern.startDate, "MMM dd, yyyy")}</span>
            {pattern.endDate && <span>• End: {format(pattern.endDate, "MMM dd, yyyy")}</span>}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendar Preview
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">{format(currentMonth, "MMMM yyyy")}</span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month start */}
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2" />
            ))}

            {/* Month days */}
            {monthDays.map((day) => {
              const isRecurring = isRecurringDate(day)
              const isToday = isSameDay(day, new Date())

              return (
                <div
                  key={day.toISOString()}
                  className={`
                    p-2 text-center text-sm rounded-md cursor-pointer transition-colors
                    ${
                      isRecurring
                        ? "bg-blue-100 text-blue-900 font-semibold border-2 border-blue-300"
                        : "hover:bg-gray-100"
                    }
                    ${isToday ? "ring-2 ring-blue-500" : ""}
                  `}
                >
                  {day.getDate()}
                </div>
              )
            })}
          </div>

          {/* Upcoming Dates List */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Next {Math.min(5, previewDates.length)} Occurrences</h4>
            <div className="space-y-1">
              {previewDates.slice(0, 5).map((date, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{format(date, "EEEE, MMMM dd, yyyy")}</span>
                  <Badge variant="secondary" className="text-xs">
                    {format(date, "MMM dd")}
                  </Badge>
                </div>
              ))}
            </div>

            {previewDates.length > 5 && (
              <p className="text-xs text-gray-500 mt-2">And {previewDates.length - 5} more occurrences...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
