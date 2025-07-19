# 🔁 Recurring Date Picker Component

A comprehensive, reusable recurring date picker component built with Next.js 15, React, Zustand, and Tailwind CSS. This component allows users to configure complex recurring date patterns similar to those found in popular calendar applications like Google Calendar and TickTick.

## ✨ Features

### 🔄 Recurrence Patterns
- **Daily**: Repeat every X days
- **Weekly**: Repeat on specific days of the week
- **Monthly**: Repeat on specific day of month or complex patterns (e.g., "second Tuesday")
- **Yearly**: Repeat annually on the same date

### 🎯 Advanced Configuration
- Custom intervals (every 2 weeks, every 3 months, etc.)
- Multiple day selection for weekly patterns
- Complex monthly rules ("first Monday", "last Friday", etc.)
- Flexible date ranges with optional end dates

### 📅 Visual Preview
- Interactive calendar showing recurring dates
- Month navigation
- Upcoming occurrences list
- Real-time pattern updates

### 🏗️ Architecture
- **Modular Components**: Clean separation of concerns
- **State Management**: Zustand for efficient state handling
- **TypeScript**: Full type safety
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Testing**: Comprehensive unit and integration tests

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd recurring-date-picker

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx                 # Main application page
│   └── layout.tsx              # Root layout
├── components/
│   └── recurring-date-picker/
│       ├── RecurringDatePicker.tsx      # Main component
│       ├── RecurrenceOptionSelector.tsx # Pattern type selector
│       ├── CustomPatternConfigurator.tsx # Advanced configuration
│       ├── DateRangePicker.tsx          # Date range selection
│       └── CalendarPreview.tsx          # Visual calendar preview
├── lib/
│   ├── types.ts                # TypeScript definitions
│   ├── store.ts               # Zustand state management
│   └── recurrence-utils.ts    # Core recurrence logic
└── __tests__/
    ├── recurrence-utils.test.ts
    └── RecurringDatePicker.test.tsx
\`\`\`

## 🔧 Core Components

### RecurringDatePicker
The main component that orchestrates all sub-components and manages the overall state.

\`\`\`tsx
<RecurringDatePicker
  onRecurrenceChange={(pattern) => {
    console.log('New pattern:', pattern)
  }}
/>
\`\`\`

### RecurrenceOptionSelector
Allows users to choose between Daily, Weekly, Monthly, and Yearly patterns.

### CustomPatternConfigurator
Provides advanced configuration options based on the selected recurrence type:
- Interval settings
- Day of week selection (weekly)
- Day of month or complex patterns (monthly)

### DateRangePicker
Handles start and end date selection with calendar popups.

### CalendarPreview
Visual representation of the recurring pattern with:
- Monthly calendar view
- Highlighted recurring dates
- Navigation controls
- Upcoming occurrences list

## 🧠 State Management

The component uses Zustand for state management with the following structure:

\`\`\`typescript
interface RecurringDatePickerState {
  pattern: RecurrencePattern
  previewDates: Date[]
  isPreviewVisible: boolean
  setPattern: (pattern: Partial<RecurrencePattern>) => void
  setPreviewDates: (dates: Date[]) => void
  togglePreview: () => void
  generatePreviewDates: () => void
}
\`\`\`

## 🔄 Recurrence Logic

The core recurrence calculation is handled in \`recurrence-utils.ts\`:

### Supported Patterns
- **Daily**: Every N days from start date
- **Weekly**: Specific days of the week, every N weeks
- **Monthly**: 
  - Simple: Same day of month
  - Complex: "First Monday", "Last Friday", etc.
- **Yearly**: Same date every N years

### Example Usage
\`\`\`typescript
const pattern: RecurrencePattern = {
  type: 'monthly',
  interval: 1,
  weekOfMonth: 'second',
  dayOfWeekInMonth: 'tuesday',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31')
}

const dates = generateRecurringDates(pattern, 12)
// Returns all "second Tuesdays" of each month in 2024
\`\`\`

## 🧪 Testing

The project includes comprehensive tests:

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
\`\`\`

### Test Coverage
- **Unit Tests**: Core recurrence logic
- **Integration Tests**: Component interactions
- **Edge Cases**: Complex patterns and date boundaries

## 🎨 Styling

Built with Tailwind CSS for:
- Responsive design
- Consistent spacing and typography
- Modern UI components
- Dark mode support (extensible)

## 🔮 Future Enhancements

- **RRULE Export**: Generate RFC 5545 compliant RRULE strings
- **Internationalization**: Multi-language support
- **Calendar Integration**: Google Calendar, Outlook sync
- **Timezone Support**: Handle different timezones
- **Custom Themes**: Configurable color schemes

## 📚 API Reference

### RecurrencePattern Interface
\`\`\`typescript
interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  daysOfWeek?: DayOfWeek[]
  dayOfMonth?: number
  weekOfMonth?: 'first' | 'second' | 'third' | 'fourth' | 'last'
  dayOfWeekInMonth?: DayOfWeek
  startDate: Date
  endDate?: Date
}
\`\`\`

### Main Functions
- \`generateRecurringDates(pattern, maxOccurrences)\`: Generate array of recurring dates
- \`formatRecurrenceRule(pattern)\`: Human-readable pattern description
- \`isDateMatchingPattern(date, pattern)\`: Check if date matches pattern

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
\`\`\`

This component demonstrates modern React development practices with a focus on reusability, maintainability, and user experience.
