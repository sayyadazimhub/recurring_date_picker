export type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly"

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

export type WeekOfMonth = "first" | "second" | "third" | "fourth" | "last"

export interface RecurrencePattern {
  type: RecurrenceType
  interval: number // repeat every X days/weeks/months/years
  daysOfWeek?: DayOfWeek[] // for weekly recurrence
  dayOfMonth?: number // for monthly recurrence (1-31)
  weekOfMonth?: WeekOfMonth // for complex monthly rules
  dayOfWeekInMonth?: DayOfWeek // for "second Tuesday" type rules
  startDate: Date
  endDate?: Date
}

export interface RecurringDatePickerState {
  pattern: RecurrencePattern
  previewDates: Date[]
  isPreviewVisible: boolean
  setPattern: (pattern: Partial<RecurrencePattern>) => void
  setPreviewDates: (dates: Date[]) => void
  togglePreview: () => void
  generatePreviewDates: () => void
}
