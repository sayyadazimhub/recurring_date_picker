"use client"

import RecurringDatePicker from "@/components/recurring-date-picker/RecurringDatePicker"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Recurring Date Picker Component</h1>
            <p className="text-gray-600">
              Configure recurring dates with flexible patterns and preview them in a calendar
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <RecurringDatePicker
              onRecurrenceChange={(recurrence) => {
                console.log("Recurrence changed:", recurrence)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
