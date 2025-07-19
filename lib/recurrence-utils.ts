import type { RecurrencePattern, DayOfWeek, WeekOfMonth } from "./types"

const dayOfWeekMap: Record<DayOfWeek, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

export function generateRecurringDates(pattern: RecurrencePattern, maxOccurrences = 50): Date[] {
  const dates: Date[] = []
  const startDate = new Date(pattern.startDate)
  const endDate = pattern.endDate ? new Date(pattern.endDate) : null

  let currentDate = new Date(startDate)
  let occurrences = 0

  // Prevent infinite loops
  const maxIterations = 1000
  let iterations = 0

  while (occurrences < maxOccurrences && iterations < maxIterations) {
    iterations++

    if (endDate && currentDate > endDate) {
      break
    }

    if (isDateMatchingPattern(currentDate, pattern)) {
      dates.push(new Date(currentDate))
      occurrences++
    }

    currentDate = getNextDate(currentDate, pattern)
  }

  return dates
}

function isDateMatchingPattern(date: Date, pattern: RecurrencePattern): boolean {
  const startDate = new Date(pattern.startDate)

  // Date must be on or after start date
  if (date < startDate) {
    return false
  }

  switch (pattern.type) {
    case "daily":
      return isDailyMatch(date, startDate, pattern.interval)

    case "weekly":
      return isWeeklyMatch(date, startDate, pattern)

    case "monthly":
      return isMonthlyMatch(date, startDate, pattern)

    case "yearly":
      return isYearlyMatch(date, startDate, pattern.interval)

    default:
      return false
  }
}

function isDailyMatch(date: Date, startDate: Date, interval: number): boolean {
  const daysDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff >= 0 && daysDiff % interval === 0
}

function isWeeklyMatch(date: Date, startDate: Date, pattern: RecurrencePattern): boolean {
  if (!pattern.daysOfWeek || pattern.daysOfWeek.length === 0) {
    return false
  }

  const dayOfWeek = date.getDay()
  const matchesDayOfWeek = pattern.daysOfWeek.some((day) => dayOfWeekMap[day] === dayOfWeek)

  if (!matchesDayOfWeek) {
    return false
  }

  // Check if it's the right week interval
  const weeksDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
  return weeksDiff >= 0 && weeksDiff % pattern.interval === 0
}

function isMonthlyMatch(date: Date, startDate: Date, pattern: RecurrencePattern): boolean {
  const monthsDiff = (date.getFullYear() - startDate.getFullYear()) * 12 + (date.getMonth() - startDate.getMonth())

  if (monthsDiff < 0 || monthsDiff % pattern.interval !== 0) {
    return false
  }

  // Handle complex monthly patterns
  if (pattern.weekOfMonth && pattern.dayOfWeekInMonth) {
    return isComplexMonthlyMatch(date, pattern.weekOfMonth, pattern.dayOfWeekInMonth)
  }

  // Handle simple day of month
  if (pattern.dayOfMonth) {
    return date.getDate() === pattern.dayOfMonth
  }

  // Default to start date's day of month
  return date.getDate() === startDate.getDate()
}

function isComplexMonthlyMatch(date: Date, weekOfMonth: WeekOfMonth, dayOfWeek: DayOfWeek): boolean {
  const targetDayOfWeek = dayOfWeekMap[dayOfWeek]

  if (date.getDay() !== targetDayOfWeek) {
    return false
  }

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const firstTargetDay = new Date(firstDayOfMonth)

  // Find first occurrence of target day in month
  while (firstTargetDay.getDay() !== targetDayOfWeek) {
    firstTargetDay.setDate(firstTargetDay.getDate() + 1)
  }

  const weekNumber = Math.floor((date.getDate() - firstTargetDay.getDate()) / 7) + 1

  switch (weekOfMonth) {
    case "first":
      return weekNumber === 1
    case "second":
      return weekNumber === 2
    case "third":
      return weekNumber === 3
    case "fourth":
      return weekNumber === 4
    case "last":
      // Check if this is the last occurrence of this day in the month
      const nextWeek = new Date(date)
      nextWeek.setDate(date.getDate() + 7)
      return nextWeek.getMonth() !== date.getMonth()
    default:
      return false
  }
}

function isYearlyMatch(date: Date, startDate: Date, interval: number): boolean {
  const yearsDiff = date.getFullYear() - startDate.getFullYear()
  return (
    yearsDiff >= 0 &&
    yearsDiff % interval === 0 &&
    date.getMonth() === startDate.getMonth() &&
    date.getDate() === startDate.getDate()
  )
}

function getNextDate(currentDate: Date, pattern: RecurrencePattern): Date {
  const nextDate = new Date(currentDate)

  switch (pattern.type) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + 1)
      break
    case "weekly":
      nextDate.setDate(nextDate.getDate() + 1)
      break
    case "monthly":
      nextDate.setDate(nextDate.getDate() + 1)
      break
    case "yearly":
      nextDate.setDate(nextDate.getDate() + 1)
      break
  }

  return nextDate
}

export function formatRecurrenceRule(pattern: RecurrencePattern): string {
  const { type, interval, daysOfWeek, dayOfMonth, weekOfMonth, dayOfWeekInMonth } = pattern

  let rule = `Every ${interval > 1 ? interval : ""} ${type}`

  if (type === "weekly" && daysOfWeek && daysOfWeek.length > 0) {
    const dayNames = daysOfWeek.map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    rule += ` on ${dayNames.join(", ")}`
  }

  if (type === "monthly") {
    if (weekOfMonth && dayOfWeekInMonth) {
      rule += ` on the ${weekOfMonth} ${dayOfWeekInMonth}`
    } else if (dayOfMonth) {
      rule += ` on day ${dayOfMonth}`
    }
  }

  return rule
}
