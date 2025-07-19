import { generateRecurringDates, formatRecurrenceRule } from "@/lib/recurrence-utils"
import type { RecurrencePattern } from "@/lib/types"

describe("Recurrence Utils", () => {
  describe("generateRecurringDates", () => {
    it("should generate daily recurring dates", () => {
      const pattern: RecurrencePattern = {
        type: "daily",
        interval: 2,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-10"),
      }

      const dates = generateRecurringDates(pattern, 10)

      expect(dates).toHaveLength(5) // Every 2 days from Jan 1-10
      expect(dates[0]).toEqual(new Date("2024-01-01"))
      expect(dates[1]).toEqual(new Date("2024-01-03"))
      expect(dates[2]).toEqual(new Date("2024-01-05"))
    })

    it("should generate weekly recurring dates", () => {
      const pattern: RecurrencePattern = {
        type: "weekly",
        interval: 1,
        daysOfWeek: ["monday", "wednesday"],
        startDate: new Date("2024-01-01"), // Monday
        endDate: new Date("2024-01-15"),
      }

      const dates = generateRecurringDates(pattern, 10)

      expect(dates.length).toBeGreaterThan(0)
      // Check that all dates are either Monday or Wednesday
      dates.forEach((date) => {
        const dayOfWeek = date.getDay()
        expect([1, 3]).toContain(dayOfWeek) // Monday = 1, Wednesday = 3
      })
    })

    it("should generate monthly recurring dates", () => {
      const pattern: RecurrencePattern = {
        type: "monthly",
        interval: 1,
        dayOfMonth: 15,
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-15"),
      }

      const dates = generateRecurringDates(pattern, 10)

      expect(dates.length).toBe(6) // Jan, Feb, Mar, Apr, May, Jun
      dates.forEach((date) => {
        expect(date.getDate()).toBe(15)
      })
    })

    it("should generate complex monthly recurring dates", () => {
      const pattern: RecurrencePattern = {
        type: "monthly",
        interval: 1,
        weekOfMonth: "second",
        dayOfWeekInMonth: "tuesday",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-30"),
      }

      const dates = generateRecurringDates(pattern, 10)

      // Check that all dates are Tuesdays
      dates.forEach((date) => {
        expect(date.getDay()).toBe(2) // Tuesday = 2
      })
    })

    it("should generate yearly recurring dates", () => {
      const pattern: RecurrencePattern = {
        type: "yearly",
        interval: 1,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2027-01-01"),
      }

      const dates = generateRecurringDates(pattern, 10)

      expect(dates.length).toBe(4) // 2024, 2025, 2026, 2027
      dates.forEach((date) => {
        expect(date.getMonth()).toBe(0) // January
        expect(date.getDate()).toBe(1)
      })
    })
  })

  describe("formatRecurrenceRule", () => {
    it("should format daily recurrence rule", () => {
      const pattern: RecurrencePattern = {
        type: "daily",
        interval: 2,
        startDate: new Date("2024-01-01"),
      }

      const rule = formatRecurrenceRule(pattern)
      expect(rule).toBe("Every 2 daily")
    })

    it("should format weekly recurrence rule", () => {
      const pattern: RecurrencePattern = {
        type: "weekly",
        interval: 1,
        daysOfWeek: ["monday", "wednesday", "friday"],
        startDate: new Date("2024-01-01"),
      }

      const rule = formatRecurrenceRule(pattern)
      expect(rule).toBe("Every weekly on Monday, Wednesday, Friday")
    })

    it("should format complex monthly recurrence rule", () => {
      const pattern: RecurrencePattern = {
        type: "monthly",
        interval: 1,
        weekOfMonth: "second",
        dayOfWeekInMonth: "tuesday",
        startDate: new Date("2024-01-01"),
      }

      const rule = formatRecurrenceRule(pattern)
      expect(rule).toBe("Every monthly on the second tuesday")
    })
  })
})
