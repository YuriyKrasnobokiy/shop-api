import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";


export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map(e=> ({
        field: e.path.join('.'),
        message: e.message,
      }))
        return res.status(400).json({ 
          error: "Invalid request body",
          details
        });   
      }

    req.body = result.data;
    next();
  };
};
