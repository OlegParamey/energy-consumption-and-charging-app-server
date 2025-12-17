# UK Energy Mix Analyzer - Server

A Node.js backend service that provides UK energy mix data and optimal EV charging window calculations based on clean energy availability.

## Features

### Energy Mix Data Endpoint

-   **Fetch 3-day forecast**: Retrieves energy generation data for today, tomorrow, and the day after tomorrow
-   **Data aggregation**: Groups 30-minute intervals by date and calculates daily averages
-   **Clean energy calculation**: Computes percentage of clean energy sources (biomass, nuclear, hydro, wind, solar)
-   **Structured response**: Returns organized data with energy source percentages and clean energy share

### Optimal Charging Window Endpoint

-   **Flexible duration**: Accepts charging duration from 1 to 6 hours
-   **Smart optimization**: Finds the time window with highest clean energy percentage
-   **Cross-day windows**: Supports charging windows that span across two days
-   **Detailed results**: Returns start time, end time, and average clean energy percentage

## Tech Stack

-   **Node.js**
-   **Express.js**
-   **Jest**
-   **Carbon Intensity API** - External data source for UK energy mix

## Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd energy-consumption-and-charging-app-server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (if needed):

```env
PORT=3000
CARBON_INTENSITY_API_URL=https://api.carbonintensity.org.uk
```

## Development

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Production

Start the production server:

```bash
npm start
```

## Testing

Run tests:

```bash
npm test
```

## Project Structure

```
energy-consumption-and-charging-app-server/
├── node_modules/
├── services/
│   ├── getEnergyDataForThreeDays.js          # Fetch and process 3-day energy data
│   ├── getEnergyDataForThreeDays.test.js
│   ├── getOptimalChargingWindowTime.js       # Calculate optimal charging window
│   └── getOptimalChargingWindowTime.test.js
├── utils/
│   ├── DisplayEnergyMix/
│   │   ├── calculateAverageEnergyPercentForOneDay.js
│   │   ├── calculateAverageEnergyPercentForOneDay.test.js
│   │   ├── calculateCleanEnergyPercentForOneDay.js
│   │   ├── calculateCleanEnergyPercentForOneDay.test.js
│   │   ├── getUTCThreeNextDaysDate.js        # Date utilities
│   │   ├── getUTCThreeNextDaysDate.test.js
│   │   ├── splitDataByThreeDays.js           # Group intervals by day
│   │   └── splitDataByThreeDays.test.js
│   └── findOptimalChargingWindowTime/
│       ├── findOptimalChargingWindowTime.js   # Core optimization algorithm
│       └── findOptimalChargingWindowTime.test.js
├── .gitignore
├── constants.js                               # Configuration constants
├── Dockerfile                                 # Docker configuration
├── index.js                                   # Application entry point
├── package.json
├── package-lock.json
└── README.md
```

## API Endpoints

### GET `/generation-mix-for-three-next-days`

Retrieves energy mix data for the next three days with daily averages.

**Response:**

```json
{
	"data": [
		{
			"dayKey": "today",
			"cleanEnergyPercent": 60,
			"generationMix": {
				"biomass": 7.5,
				"coal": 0,
				"imports": 7.7,
				"gas": 32.3,
				"nuclear": 10.5,
				"other": 0,
				"hydro": 0,
				"solar": 0.3,
				"wind": 41.7
			}
		},
		{
			"dayKey": "tomorrow",
			"cleanEnergyPercent": 66.4,
			"generationMix": {
				"biomass": 6.8,
				"coal": 0,
				"imports": 11.1,
				"gas": 22.6,
				"nuclear": 11.5,
				"other": 0,
				"hydro": 0,
				"solar": 0.3,
				"wind": 47.8
			}
		},
		{
			"dayKey": "day-after-tomorrow",
			"cleanEnergyPercent": 75.4,
			"generationMix": {
				"biomass": 5.8,
				"coal": 0,
				"imports": 7.3,
				"gas": 17.3,
				"nuclear": 11.8,
				"other": 0,
				"hydro": 0,
				"solar": 2.3,
				"wind": 55.5
			}
		}
	]
}
```

### GET `/optimal-charging-time`

Calculates the optimal charging window based on clean energy availability.

**Query Parameters:**

-   `hours` (required): Integer from 1 to 6 (hours)

**Example Request:**

```
GET /optimal-charging-window-time?hours=1
```

**Response:**

```json
{
	"start": {
		"date": "19.12.2025",
		"time": "05:30"
	},
	"end": {
		"date": "19.12.2025",
		"time": "06:30"
	},
	"averageCleanEnergyPercent": 77.45
}
```

**Error Response:**

```json
{
	"error": "Failed to fetch data"
}
```

## Services

### getEnergyDataForThreeDays.js

Orchestrates the entire process of fetching and processing energy data:

1. Generates date ranges for 3 days
2. Fetches data from Carbon Intensity API
3. Splits data into daily chunks
4. Calculates average energy percentages per day
5. Computes clean energy percentage for each day

### getOptimalChargingWindowTime.js

Finds the optimal charging window:

1. Validates duration parameter (1-6 hours)
2. Fetches 2-day energy forecast
3. Converts hours to 30-minute intervals (e.g., 3 hours = 6 intervals)
4. Uses sliding window algorithm to find highest clean energy period
5. Returns formatted result with timestamps and clean energy percentage

## Utilities

### DisplayEnergyMix Utils

**calculateAverageEnergyPercentForOneDay.js**

-   Calculates average percentage for each energy source across all intervals in a day
-   Handles missing data gracefully

**calculateCleanEnergyPercentForOneDay.js**

-   Sums percentages of clean energy sources
-   Clean sources: biomass, nuclear, hydro, wind, solar

**getUTCThreeNextDaysDate.js**

-   Generates start and end timestamps for 3 consecutive days
-   Returns UTC formatted dates for API requests

**splitDataByThreeDays.js**

-   Groups 30-minute intervals by date
-   Organizes data into day-based structure

### findOptimalChargingWindowTime Utils

**findOptimalChargingWindowTime.js**

-   Calculates clean energy average for each possible window
-   Finds maximum clean energy window
-   Returns formatted result with ISO timestamps

## External API Integration

The service integrates with the **Carbon Intensity API**:

**Base URL:** `https://api.carbonintensity.org.uk`

**Endpoint Used:** `GET /generation/{from}/{to}`

-   `from`: ISO 8601 timestamp (start)
-   `to`: ISO 8601 timestamp (end)
-   Returns 30-minute interval data

**Response Structure:**

```json
{
	"data": [
		{
			"from": "2024-12-17T00:00Z",
			"to": "2024-12-17T00:30Z",
			"generationmix": [
				{ "fuel": "biomass", "perc": 5.2 },
				{ "fuel": "coal", "perc": 0.0 },
				{ "fuel": "nuclear", "perc": 18.3 },
				{ "fuel": "wind", "perc": 25.1 }
				/* ... */
			]
		}
	]
}
```

## Clean Energy Sources

The following sources are classified as clean energy:

-   **Biomass**
-   **Nuclear**
-   **Hydro**
-   **Wind**
-   **Solar**

Clean energy percentage = Sum of percentages of these sources

## Data Processing

### 30-Minute Intervals

-   API provides data in 30-minute intervals
-   1 hour = 2 intervals
-   3 hours = 6 intervals
-   6 hours = 12 intervals

### Daily Aggregation

For the 3-day endpoint:

1. Fetch all 30-minute intervals for 3 days
2. Group intervals by date
3. Calculate average percentage for each energy source per day
4. Compute daily clean energy percentage

### Optimal Window Calculation

For charging optimization:

1. Fetch 2-day forecast (today + tomorrow)
2. Create sliding window of requested duration
3. Calculate average clean energy for each window position
4. Return window with highest clean energy percentage

## Testing

The project includes comprehensive unit tests for:

-   Service layer functions
-   Utility functions
-   Data processing logic
-   Edge cases and error scenarios

Test coverage includes:

-   Date generation and formatting
-   Data splitting and grouping
-   Energy percentage calculations
-   Optimal window finding algorithm

## CORS Configuration

The server is configured to accept requests from the frontend application. Update CORS settings in `index.js` if needed.
