import { Request, Response } from 'express';
import { TravelPreferences, travelSchema } from '../schemas/tps-schema';
import ChatGPTService from '../services/recommendation';

export const getTravelSuggestions = async (
  req: Request,
  res: Response
) => {
  const preferencesInput = req.body;

  const parsed = travelSchema.safeParse(preferencesInput);
  if (!parsed.success) {
    return res.render('index', { recommendations: [] })
    // res.status(400).json({
    //   error: 'Invalid travel preferences provided',
    //   details: parsed.error,
    // });
  }

  const preferences: TravelPreferences = parsed.data;

  try {
    const recommendations =
      await ChatGPTService.generateTravelRecommendations(preferences);
    // return res.render('index', { recommendations: JSON.parse(recommendations).recommendations });
    res.render('partials/recommendations', { recommendations: JSON.parse(recommendations).recommendations });
  } catch (error) {
    console.error('Error generating travel recommendations:', error);
    return res
      .status(500)
      .json({ error: 'Failed to generate travel recommendations' });
  }
};
