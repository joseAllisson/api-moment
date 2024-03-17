import { NextFunction, Request, Response } from "express";

const authApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header('x-api-key');
  
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }
  
    const validApiKeys = [process.env.x_api_key];
    if (!validApiKeys.includes(apiKey)) {
      return res.status(403).json({ error: 'Invalid API key' });
    }
  
    next();
};

export default authApiKey;