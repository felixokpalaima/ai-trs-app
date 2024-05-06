import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { TravelPreferences } from '../schemas/tps-schema';
import { ChatCompletionMessageParam } from 'openai/resources';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const schema = {
  type: 'object',
  properties: {
    recommendations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          suggestion: {
            type: 'string',
          },
          reason_summary: {
            type: 'string',
          },
          accommodation: {
            type: 'object',
            properties: {
              options: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              sites: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['options', 'sites'],
          },
          food: {
            type: 'object',
            properties: {
              options: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              sites: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['options', 'sites'],
          },
          flight: {
            type: 'object',
            properties: {
              options: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              sites: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['options', 'sites'],
          },
          weather: {
            type: 'string',
          },
          local_transportation_options: {
            type: 'object',
            properties: {
              options: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              sites: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['options'],
          },
          visa_requirements: {
            type: 'string',
          },
          additional_info: {
            type: 'string',
          },
          travel_restrictions: {
            type: 'string',
          },
          clothing: {
            type: 'string',
          },
        },
        required: [
          'suggestion',
          'reason_summary',
          'accommodation',
          'food',
          'flight',
          'weather',
          'visa_requirements',
          'local_transportation_options',
        ],
      },
    },
  },
  required: ['recommendations'],
};
class ChatGPTService {
  static async generateTravelRecommendations(
    preferences: TravelPreferences
  ): Promise<string> {
    // Build the prompt based on user preferences
    const messages = ChatGPTService.buildMessages(preferences);

    // Call OpenAI API with the constructed prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-2024-04-09',
      messages,
      functions: [
        {
          name: 'recommendation',
          description: `The preferencies are so you can recommend where I could go.
        I have a destination in mind but feel free to reommend better plces
        considering my preferences, weather and time of the year.
        The aim is that you tell me where best to go according to
        my preferences or when best to go to my prefered  destination.
        Make your reasons granulater. for every recommendation include
        sites I could check it out your reasons like flight, hotel, food.
        You need to not be vague. i want to see precise recommendtions like,
        with the budget of $1500 you can go to ABC flight from {countryOfResidence}
        to {suggestedDestination} is $200 to $300 in May and hotels in D city of ABC
        ranges from $30 to $50 per night anf weather is xyx etc. Remember to include
        food ideas aconsidering preferences Make it more details in json`,
          parameters: schema,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.0,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
      top_p: 0.95,
    });

    return response.choices[0].message.function_call?.arguments ?? '{}';
  }

  private static buildBasicInformationPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = `Destination: ${preferences.basicInformation.desiredDestination}\n, Flexibility: ${preferences.basicInformation.travelCountryFlexibility}`;
    prompt += `Travel Dates: ${preferences.basicInformation.travelDates}, Flexibility: ${preferences.basicInformation.travelDateFlexibility}\n`;
    prompt += `Duration: ${preferences.basicInformation.tripDuration} days\n`;
    prompt += `Country of Residence: ${preferences.basicInformation.countryOfResidence}\n`;
    return prompt;
  }

  private static buildBudgetAndAccommodationPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = `Budget Range: ${preferences.budgetAndAccommodation.budgetRange.join(' to ')} in ${preferences.budgetAndAccommodation.currency}\n`;
    prompt += `Accommodation Type: ${preferences.budgetAndAccommodation.accommodationType}\n`;
    if (preferences.budgetAndAccommodation.accommodationAmenities.length > 0) {
      prompt += `Amenities: ${preferences.budgetAndAccommodation.accommodationAmenities.join(', ')}\n`;
    }
    return prompt;
  }

  private static buildTravelCompanionsPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = `Traveling with: ${preferences.travelCompanions.companionType}\n`;
    if (preferences.travelCompanions.numberOfChildren) {
      prompt += `Number of Children: ${preferences.travelCompanions.numberOfChildren}\n`;
    }
    if (preferences.travelCompanions.specialNeeds) {
      prompt += `Special Needs: ${preferences.travelCompanions.specialNeeds}\n`;
    }
    return prompt;
  }

  private static buildActivitiesAndInterestsPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = 'Activities and Interests:\n';
    if (preferences.activitiesAndInterests?.activitiesInterestedIn?.length > 0) {
      prompt += `Interested in: ${preferences.activitiesAndInterests.activitiesInterestedIn.join(', ')}\n`;
    }
    if (preferences.activitiesAndInterests.specificLandmarks?.length) {
      prompt += `Must-visit Landmarks: ${preferences.activitiesAndInterests.specificLandmarks.join(', ')}\n`;
    }
    prompt += `Preference: ${preferences.activitiesAndInterests.activityVsRelaxationTime}\n`;
    return prompt;
  }

  private static buildTravelPreferencesPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = 'Travel Preferences:\n';
    if (preferences.travelPreferences.preferredTransportation.length > 0) {
      prompt += `Preferred Modes of Transportation: ${preferences.travelPreferences.preferredTransportation.join(', ')}\n`;
    }
    prompt += `Food Preference: ${preferences.travelPreferences.mealPreference.foodTypePreference}\n`;
    if (
      preferences.travelPreferences.mealPreference.specificDietaryNeeds?.length
    ) {
      prompt += `Dietary Needs: ${preferences.travelPreferences.mealPreference.specificDietaryNeeds.join(', ')}\n`;
    }
    prompt += `Destination Type: ${preferences.travelPreferences.destinationType}\n`;
    prompt += `Prefer Local Experiences: ${preferences.travelPreferences.culturalPreferences.preferLocal ? 'Yes' : 'No'}\n`;
    prompt += `Interested in Cultural Activities: ${preferences.travelPreferences.culturalPreferences.interestedInCulturalActivities ? 'Yes' : 'No'}\n`;
    if (
      preferences.travelPreferences.culturalPreferences.continentalPreferences
        .length > 0
    ) {
      prompt += `Continental Preferences: ${preferences.travelPreferences.culturalPreferences.continentalPreferences.join(', ')}\n`;
    }
    return prompt;
  }

  private static buildHealthAndSafetyPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = 'Health and Safety Preferences:\n';
    if (preferences.healthAndSafety.healthConcerns) {
      prompt += `Health Concerns: ${preferences.healthAndSafety.healthConcerns}\n`;
    }
    prompt += `Healthcare Access Level Needed: ${preferences.healthAndSafety.healthcareAccessLevel}\n`;
    if (preferences.healthAndSafety.safetyConcerns) {
      prompt += `Safety Concerns: ${preferences.healthAndSafety.safetyConcerns}\n`;
    }
    return prompt;
  }

  private static buildEnvironmentalAndCulturalPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = 'Environmental and Cultural Preferences:\n';
    prompt += `Sustainability Importance: ${preferences.environmentalAndCultural.sustainabilityImportance ? 'Yes' : 'No'}\n`;
    prompt += `Cultural Immersion Interest: ${preferences.environmentalAndCultural.culturalImmersionInterest ? 'Yes' : 'No'}\n`;
    if (preferences.environmentalAndCultural.languagePreferences?.length) {
      prompt += `Language Preferences: ${preferences.environmentalAndCultural.languagePreferences.join(', ')}\n`;
    }
    return prompt;
  }

  private static buildMiscellaneousPrompt(
    preferences: TravelPreferences
  ): string {
    let prompt = 'Miscellaneous Preferences:\n';
    prompt += `Internet Connectivity Importance: ${preferences.miscellaneous.internetConnectivityImportance ? 'High' : 'Low'}\n`;
    if (preferences.miscellaneous.loyaltyPrograms?.length) {
      prompt += `Loyalty Programs: ${preferences.miscellaneous.loyaltyPrograms.join(', ')}\n`;
    }
    if (preferences.miscellaneous.specificRequirements) {
      prompt += `Specific Requirements: ${preferences.miscellaneous.specificRequirements}\n`;
    }
    return prompt;
  }

  public static buildPrompt(preferences: TravelPreferences): string {
    let prompt = `Please plan a comprehensive travel itinerary based on the following preferences:\n`;

    prompt += ChatGPTService.buildBasicInformationPrompt(preferences);
    prompt += ChatGPTService.buildBudgetAndAccommodationPrompt(preferences);
    prompt += ChatGPTService.buildTravelCompanionsPrompt(preferences);
    prompt += ChatGPTService.buildActivitiesAndInterestsPrompt(preferences);
    prompt += ChatGPTService.buildTravelPreferencesPrompt(preferences);
    prompt += ChatGPTService.buildHealthAndSafetyPrompt(preferences);
    prompt += ChatGPTService.buildEnvironmentalAndCulturalPrompt(preferences);
    prompt += ChatGPTService.buildMiscellaneousPrompt(preferences);
    prompt += `Considering all these preferences, provide a detailed and personalized itinerary.`;

    return prompt;
  }

  private static buildMessages(
    preferences: TravelPreferences
  ): ChatCompletionMessageParam[] {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content: `I am planning a trip and need recommendations. Here are my preferences: Destination - ${ChatGPTService.buildPrompt(preferences)}`,
      },
      { role: 'system', content: 'Start a new travel Recommedation.' },
      // {
      //   role: 'user',
      //   content: `Strictly adhere to this schema for response ${schema}. The preferencies are so you can recommend where I could go.
      //   I have a destination in mind but feel free to reommend better plces
      //   considering my preferences, weather and time of the year.
      //   The aim is that you tell me where best to go according to
      //   my preferences or when best to go to my prefered  destination.
      //   Make your reasons granulater. for every recommendation include
      //   sites I could check it out your reasons like flight, hotel, food.
      //   You need to not be vague. i want to see precise recommendtions like,
      //   with the budget of $1500 you can go to ABC flight from {countryOfResidence}
      //   to {suggestedDestination} is $200 to $300 in May and hotels in D city of ABC
      //   ranges from $30 to $50 per night anf weather is xyx etc. Remember to include
      //   food ideas aconsidering preferences Make it more details in json`,
      // },
      {
        role: 'user',
        content: `Return only three recommendations.
        Pay attention to the destination flexibility.
        All currencies are in Dollars, in json format `,
      },
      // {
      //   role: 'user',
      //   content: `Strictly adhere to this schema for response ${schema}. be discriptive and give numbers and sites. do not leave anything out`,
      // },
    ];

    return messages;
  }
}

export default ChatGPTService;
