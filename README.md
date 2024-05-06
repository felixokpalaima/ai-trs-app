# AI Travel Recommendation API

This project provides a REST API that leverages ChatGPT to generate personalized travel recommendations. Users can submit their travel preferences, and the API returns top travel suggestions.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- OpenAI API key

### Installing

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/ai-tps.git
cd ai-tps
```

### Install the Dependencies

After cloning the repository, navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory of your project. You will need to add your OpenAI API key here:

```plaintext
OPENAI_API_KEY=your_openai_api_key_here
```

### Running the Application

Launch the application by executing:

```bash
npm start
```

The server will start and listen on the default port (usually port 3000) unless configured otherwise in your environment settings.

## API Usage

### Endpoint: Generate Travel Itinerary

- **URL**: `/travel-recommendations`

- **Method**: `POST`

- **Content-Type**: `application/json`

- **Request Body Example**:

```json
  {
    "basicInformation": {
        "desiredDestination": "Nigeria",
        "travelCountryFlexibility": "Fixed",
        "travelDates": "2024-03-15 to 2024-03-30",
        "travelDateFlexibility": "Flexible within a week",
        "tripDuration": 15,
        "countryOfResidence": "Greece"
    },
    "budgetAndAccommodation": {
        "currency": "EUR",
        "budgetRange": [
            2500,
            3500
        ],
        "accommodationType": "Apartment",
        "accommodationAmenities": [
            "Wi-Fi",
            "Kitchen",
            "Parking"
        ]
    },
    "travelCompanions": {
        "companionType": "Family",
        "childrenAges": [
            7,
            10
        ],
        "specialNeeds": "Near public parks"
    },
    "activitiesAndInterests": {
        "activitiesInterestedIn": [
            "Hiking",
            "Sightseeing",
            "Beach"
        ],
        "specificLandmarks": [
            "Milford Sound",
            "Mount Cook"
        ],
        "activityVsRelaxationTime": "Balanced"
    },
    "travelPreferences": {
        "preferredTransportation": [
            "Car Hire",
            "Public Transport"
        ],
        "mealPreference": {
            "foodTypePreference": "Local Cuisine",
            "specificDietaryNeeds": [
                "Vegetarian"
            ]
        },
        "destinationType": "Off-the-beaten-path",
        "culturalPreferences": {
            "preferLocal": true,
            "interestedInCulturalActivities": true,
            "continentalPreferences": [
                "Asian",
                "European"
            ]
        }
    },
    "healthAndSafety": {
        "healthConcerns": "Allergy to peanuts",
        "healthcareAccessLevel": "High",
        "safetyConcerns": "Low crime rate areas"
    },
    "environmentalAndCultural": {
        "sustainabilityImportance": true,
        "culturalImmersionInterest": true,
        "languagePreferences": [
            "English"
        ]
    },
    "miscellaneous": {
        "internetConnectivityImportance": true,
        "loyaltyPrograms": [
            "Marriott Bonvoy"
        ],
        "specificRequirements": "Close to public transportation"
    }
}
```

### Below is the input type

```js

interface TravelSchema {
  basicInformation: BasicInformation;
  budgetAndAccommodation: BudgetAndAccommodation;
  travelCompanions: TravelCompanions;
  activitiesAndInterests: ActivitiesAndInterests;
  travelPreferences: TravelPreferences;
  healthAndSafety: HealthAndSafety;
  environmentalAndCultural: EnvironmentalAndCultural;
  miscellaneous: Miscellaneous;
}

interface BasicInformation {
  desiredDestination: string;
  travelDates: string;
  travelDateFlexibility: 'Fixed' | 'Flexible within a week' | 'Flexible within a month';
  travelCountryFlexibility: 'Fixed' | 'Flexible within continent' | 'Flexible the whole world';
  countryOfResidence: string;
  tripDuration: number;
}

interface BudgetAndAccommodation {
  budgetRange: [number, number];
  accommodationType: 'Hotel' | 'Hostel' | 'Apartment' | 'Resort';
  accommodationAmenities: string[];
  currency: 'NGN' | 'USD' | 'EUR' | 'GBP';
}

interface TravelCompanions {
  companionType: 'Alone' | 'Partner' | 'Family' | 'Friends';
  childrenAges?: number[];
  specialNeeds?: string;
}

interface ActivitiesAndInterests {
  activitiesInterestedIn: string[];
  specificLandmarks?: string[];
  activityVsRelaxationTime: 'Mostly activities' | 'Balanced' | 'Mostly relaxation';
}

interface TravelPreferences {
  preferredTransportation: ('Train' | 'Car Hire' | 'Ride Hailing' | 'Public Transport' | 'Biking' | 'Walking')[];
  mealPreference: MealPreference;
  destinationType: 'Off-the-beaten-path' | 'Popular tourist spots';
  culturalPreferences: CulturalPreferences;
}

interface MealPreference {
  foodTypePreference: 'Local Cuisine' | 'Continental' | 'Vegetarian' | 'Vegan' | 'No Preference';
  specificDietaryNeeds?: string[];
}

interface CulturalPreferences {
  preferLocal: boolean;
  interestedInCulturalActivities: boolean;
  continentalPreferences: ('Asian' | 'European' | 'African' | 'American' | 'Australian')[];
}

interface HealthAndSafety {
  healthConcerns?: string;
  healthcareAccessLevel: 'Basic' | 'Moderate' | 'High';
  safetyConcerns?: string;
}

interface EnvironmentalAndCultural {
  sustainabilityImportance: boolean;
  culturalImmersionInterest: boolean;
  languagePreferences?: string[];
}

interface Miscellaneous {
  internetConnectivityImportance: boolean;
  loyaltyPrograms?: string[];
  specificRequirements?: string;
}
```
### And the output type
```js
interface Schema {
  recommendations: Recommendation[];
}

interface Recommendation {
  suggestion: string;
  reason_summary: string;
  accommodation: Accommodation;
  food: Food;
  flight: Flight;
  weather: string;
  local_transportation_options: TransportationOptions;
  visa_requirements: string;
  additional_info: string;
  travel_restrictions: string;
  clothing: string;
}

interface Accommodation {
  options: string[];
  sites: string[];
}

interface Food {
  options: string[];
  sites: string[];
}

interface Flight {
  options: string[];
  sites: string[];
}

interface TransportationOptions {
  options: string[];
  sites?: string[];
}

```# ai-trs-app
