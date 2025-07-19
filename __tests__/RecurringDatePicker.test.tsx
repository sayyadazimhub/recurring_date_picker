import { render, screen, fireEvent } from "@testing-library/react"
import RecurringDatePicker from "@/components/recurring-date-picker/RecurringDatePicker"
import { useRecurringDatePickerStore } from "@/lib/store"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock the store
jest.mock("@/lib/store")

const mockStore = {
  pattern: {
    type: "weekly",
    interval: 1,
    daysOfWeek: ["monday"],
    startDate: new Date("2024-01-01"),
    endDate: undefined,
  },
  previewDates: [],
  isPreviewVisible: true,
  setPattern: jest.fn(),
  setPreviewDates: jest.fn(),
  togglePreview: jest.fn(),
  generatePreviewDates: jest.fn(),
}

describe("RecurringDatePicker", () => {
  beforeEach(() => {
    ;(useRecurringDatePickerStore as jest.Mock).mockReturnValue(mockStore)
  })

  it("should render the component", () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText("Configure Recurring Dates")).toBeInTheDocument()
    expect(screen.getByText("Recurrence Pattern")).toBeInTheDocument()
    expect(screen.getByText("Date Range")).toBeInTheDocument()
  })

  it("should toggle preview visibility", () => {
    render(<RecurringDatePicker />)

    const toggleButton = screen.getByText("Hide Preview")
    fireEvent.click(toggleButton)

    expect(mockStore.togglePreview).toHaveBeenCalled()
  })

  it("should call onRecurrenceChange when pattern changes", () => {
    const onRecurrenceChange = jest.fn()
    render(<RecurringDatePicker onRecurrenceChange={onRecurrenceChange} />)

    expect(onRecurrenceChange).toHaveBeenCalledWith(mockStore.pattern)
  })

  it("should render recurrence type buttons", () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText("Daily")).toBeInTheDocument()
    expect(screen.getByText("Weekly")).toBeInTheDocument()
    expect(screen.getByText("Monthly")).toBeInTheDocument()
    expect(screen.getByText("Yearly")).toBeInTheDocument()
  })
})
