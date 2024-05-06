import { z } from 'zod';

const travelSchema = z.object({
  basicInformation: z.object({
    desiredDestination: z.string(),
    travelDates: z.string(),
    travelDateFlexibility: z
      .enum(['Fixed', 'Flexible within a week', 'Flexible within a month'])
      .default('Flexible within a month'),
    travelCountryFlexibility: z
      .enum(['Fixed', 'Flexible within continient', 'Flexible the whole world'])
      .default('Flexible the whole world'),
    countryOfResidence: z.string(),
    tripDuration: z.number().min(2).default(7), // Duration in days
  }),
  budgetAndAccommodation: z.object({
    budgetRange: z.tuple([z.number(), z.number()]), // Represented as [min, max]
    accommodationType: z
      .enum(['Hotel', 'Hostel', 'Apartment', 'Resort'])
      .default('Hotel'),
    accommodationAmenities: z.array(z.string()),
    currency: z.enum(['NGN', 'USD', 'EUR', 'GBP']).default('USD'),
  }),
  travelCompanions: z.object({
    companionType: z.enum(['Alone', 'Partner', 'Family', 'Friends']),
    numberOfChildren: z.string().optional(),
    specialNeeds: z.string().optional(),
  }),
  activitiesAndInterests: z.object({
    activitiesInterestedIn: z.array(z.string().optional()),
    specificLandmarks: z.array(z.string()).optional(),
    activityVsRelaxationTime: z.enum([
      'Mostly activities',
      'Balanced',
      'Mostly relaxation',
    ]),
  }),
  travelPreferences: z.object({
    preferredTransportation: z.array(
      z.enum([
        'Train',
        'Car Hire',
        'Ride Hailing',
        'Public Transport',
        'Biking',
        'Walking',
      ])
    ),
    mealPreference: z.object({
      foodTypePreference: z.enum([
        'Local Cuisine',
        'Continental',
        'Vegetarian',
        'Vegan',
        'No Preference',
      ]),
      specificDietaryNeeds: z.array(z.string()).optional(),
    }),
    destinationType: z.enum(['Off-the-beaten-path', 'Popular tourist spots']),
    culturalPreferences: z.object({
      preferLocal: z.boolean(),
      interestedInCulturalActivities: z.boolean(),
      continentalPreferences: z.array(
        z.enum(['Asian', 'European', 'African', 'American', 'Australian'])
      ),
    }),
  }),
  healthAndSafety: z.object({
    healthConcerns: z.string().optional(),
    healthcareAccessLevel: z
      .enum(['Basic', 'Moderate', 'High'])
      .default('Basic'),
    safetyConcerns: z.string().optional(),
  }),
  environmentalAndCultural: z.object({
    sustainabilityImportance: z.boolean(),
    culturalImmersionInterest: z.boolean(),
    languagePreferences: z.array(z.string()).optional(),
  }),
  miscellaneous: z.object({
    internetConnectivityImportance: z.boolean(),
    loyaltyPrograms: z.array(z.string()).optional(),
    specificRequirements: z.string().optional(),
  }),
});

type TravelPreferences = z.infer<typeof travelSchema>;

export { travelSchema, TravelPreferences };
