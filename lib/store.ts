import { create } from "zustand"
import type { RecurringDatePickerState, RecurrencePattern } from "./types"
import { generateRecurringDates } from "./recurrence-utils"

const defaultPattern: RecurrencePattern = {
  type: "weekly",
  interval: 1,
  daysOfWeek: ["monday"],
  startDate: new Date(),
  endDate: undefined,
}

export const useRecurringDatePickerStore = create<RecurringDatePickerState>((set, get) => ({
  pattern: defaultPattern,
  previewDates: [],
  isPreviewVisible: true,

  setPattern: (newPattern) => {
    const currentPattern = get().pattern
    const updatedPattern = { ...currentPattern, ...newPattern }
    set({ pattern: updatedPattern })

    // Auto-generate preview dates when pattern changes
    const previewDates = generateRecurringDates(updatedPattern, 50) // Generate next 50 occurrences
    set({ previewDates })
  },

  setPreviewDates: (dates) => set({ previewDates: dates }),

  togglePreview: () => set((state) => ({ isPreviewVisible: !state.isPreviewVisible })),

  generatePreviewDates: () => {
    const { pattern } = get()
    const previewDates = generateRecurringDates(pattern, 50)
    set({ previewDates })
  },
}))
