import { z } from "zod";
import { commonText, emailSchema, phoneSchema, shortText } from "./security";

const nullableText = commonText.nullable().default(null);
const shortNullableText = shortText.nullable().default(null);

export const quoteRequestSchema = z.object({
  jobType: shortText.min(1),
  location: commonText.min(1),
  timeline: shortText.optional().default(""),
  description: commonText.min(10).max(4_000),
  name: shortText.min(1),
  email: emailSchema,
  phone: phoneSchema,
  website: z.string().max(0).optional(),
  company: z.string().max(0).optional(),
  url: z.string().max(0).optional(),
}).strict();

const imageSchema = z.object({
  media_type: z.enum(["image/jpeg", "image/png", "image/webp"]),
  data: z.string().min(1).max(900_000),
}).strict();

export const designChatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      text: commonText.max(4_000),
      images: z.array(imageSchema).max(6).optional(),
    }).strict()
  ).min(1).max(12),
}).strict();

export const reportMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: commonText.max(4_000),
  hasPhoto: z.boolean().optional().default(false),
  imageCount: z.number().int().min(0).max(6).optional().default(0),
}).strict();

export const generateReportSchema = z.object({
  messages: z.array(reportMessageSchema).min(2).max(20),
}).strict();

export const extractedReportSchema = z.object({
  jobType: shortText.min(1).default("Renovation Project"),
  location: shortNullableText,
  budget: shortNullableText,
  estimatedCost: shortNullableText,
  timeline: shortNullableText,
  scope: z.array(shortText).max(20).default([]),
  materials: z.array(shortText).max(20).default([]),
  designConcept: nullableText,
  aiSummary: commonText.min(1).max(2_500),
  urgency: z.enum(["low", "medium", "high"]).nullable().default(null),
  hasPhoto: z.boolean().default(false),
  photoCount: z.number().int().min(0).max(20).optional().default(0),
}).strip();

export const sendReportSchema = z.object({
  report: extractedReportSchema,
  reportToken: z.string().max(8_000).optional(),
  customer: z.object({
    name: shortText.min(1),
    email: emailSchema,
    phone: phoneSchema,
    suburb: shortText.optional().default(""),
  }).strict(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      text: commonText.max(4_000),
    }).strict()
  ).min(1).max(20),
}).strict();

export const tradieCheckoutSchema = z.object({
  plan: z.enum(["founding", "starter", "pro", "premium"]),
  businessName: shortText.min(1),
  email: emailSchema,
  contactName: shortText.min(1),
  abn: shortText.min(1),
  licenceNumber: shortText.min(1),
  phone: shortText.min(1),
  services: z.array(shortText).max(30).optional().default([]),
  areas: z.array(shortText).max(30).optional().default([]),
}).strict();

export const homeownerSessionSchema = z.object({
  email: emailSchema.optional(),
  returnPath: shortText.optional().default("/design"),
}).strict();

export const plannerProjectTypeSchema = z.enum([
  "Bathroom",
  "Kitchen",
  "Flooring",
  "Painting",
  "Outdoor",
  "Waterproofing",
  "Tiling",
  "Decking & Carpentry",
  "Landscaping & Paving",
  "Electrical & Smart Home",
  "Plumbing",
  "Roofing & Cladding",
  "Plastering & Gyprock"
]);

export const plannerAnswerSchema = z.object({
  questionId: shortText.min(1),
  question: commonText.min(1).max(800),
  answer: commonText.min(1).max(4_000),
}).strict();

export const plannerPhotoSchema = z.object({
  name: shortText.min(1).max(180),
  type: shortText.min(1).max(100),
  size: z.number().int().min(0).max(12_000_000),
  lastModified: z.number().int().min(0).optional(),
}).strict();

export const plannerQuestionRequestSchema = z.object({
  projectType: plannerProjectTypeSchema,
  answers: z.array(plannerAnswerSchema).max(8).default([]),
}).strict();

export const plannerBriefSchema = z.object({
  scope: z.array(shortText.min(1)).min(1).max(20),
  budgetRange: shortText.min(1),
  timeline: shortText.min(1),
  location: shortNullableText,
  materials: z.array(shortText.min(1)).max(20).default([]),
  photos: z.object({
    count: z.number().int().min(0).max(8),
    notes: z.array(shortText.min(1)).max(8).default([]),
  }).strict(),
  assumptions: z.array(shortText.min(1)).max(12).default([]),
  risks: z.array(shortText.min(1)).max(12).default([]),
  nextSteps: z.array(shortText.min(1)).max(12).default([]),
}).strip();

export const plannerBriefRequestSchema = z.object({
  projectType: plannerProjectTypeSchema,
  answers: z.array(plannerAnswerSchema).min(3).max(8),
  photos: z.array(plannerPhotoSchema).max(8).default([]),
}).strict();

export const verifyLicenceSchema = z.object({
  abn: z.string().min(1).max(30),
  licenceNumber: z.string().min(1).max(30),
  businessNameHint: z.string().max(200).optional().default(""),
}).strict();

