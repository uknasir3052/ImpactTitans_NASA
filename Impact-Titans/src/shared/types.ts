import z from "zod";

export interface Env {
  NASA_API_KEY: string;
}

// Asteroid data types
export const AsteroidSchema = z.object({
  id: z.string(),
  name: z.string(),
  diameter: z.number(),
  riskLevel: z.enum(['low', 'medium', 'high']),
  distance: z.number(),
  velocity: z.number(),
  isPotentiallyHazardous: z.boolean().optional(),
  closeApproachDate: z.string().optional()
});

export type AsteroidType = z.infer<typeof AsteroidSchema>;

// Impact simulation parameters
export const ImpactParamsSchema = z.object({
  size: z.number().min(0.1).max(10),
  velocity: z.number().min(5).max(70),
  location: z.string(),
  angle: z.number().min(15).max(90),
  composition: z.enum(['stony', 'iron', 'carbonaceous', 'comet'])
});

export type ImpactParamsType = z.infer<typeof ImpactParamsSchema>;

// Risk timeline data
export const RiskDataSchema = z.object({
  date: z.string(),
  riskScore: z.number(),
  asteroidCount: z.number()
});

export type RiskDataType = z.infer<typeof RiskDataSchema>;

// News item
export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  publishedAt: z.string(),
  source: z.string()
});

export type NewsItemType = z.infer<typeof NewsItemSchema>