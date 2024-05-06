import { Router } from 'express';
import { getTravelSuggestions } from '../controllers';

const recommendationRouter = Router();

recommendationRouter.post('/travel-suggestions', getTravelSuggestions);

export default recommendationRouter;
