export const focusData = [
  { day: "Mon", focus: 65, optimal: 80 },
  { day: "Tue", focus: 72, optimal: 80 },
  { day: "Wed", focus: 88, optimal: 80 },
  { day: "Thu", focus: 85, optimal: 80 },
  { day: "Fri", focus: 92, optimal: 80 },
  { day: "Sat", focus: 78, optimal: 80 },
  { day: "Sun", focus: 60, optimal: 80 },
];

export const sessionData = [
  { date: "2024-05-01", duration: 45 },
  { date: "2024-05-02", duration: 60 },
  { date: "2024-_05-03", duration: 75 },
  { date: "2024-05-04", duration: 50 },
  { date: "2024-05-05", duration: 90 },
  { date: "2024-05-06", duration: 120 },
  { date: "2024-05-07", duration: 80 },
];

export const weeklyFocusDataString = JSON.stringify({
  sessions: [
    { day: "Monday", duration: 120, distractions: 5 },
    { day: "Tuesday", duration: 150, distractions: 3 },
    { day: "Wednesday", duration: 180, distractions: 2 },
    { day: "Thursday", duration: 160, distractions: 4 },
    { day: "Friday", duration: 200, distractions: 1 },
    { day: "Saturday", duration: 90, distractions: 8 },
    { day: "Sunday", duration: 60, distractions: 10 },
  ],
  summary: {
    totalFocusTime: 960,
    averageSessionDuration: 137.14,
    peakFocusDay: "Friday",
  },
});
