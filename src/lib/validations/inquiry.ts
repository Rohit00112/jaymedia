import { z } from 'zod';

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(7, { message: 'Please enter a valid contact phone number.' })
    .max(20, { message: 'Phone number too long.' }),
  organization: z
    .string()
    .max(100, { message: 'Organization name cannot exceed 100 characters.' })
    .optional(),
  serviceOfInterest: z
    .string()
    .min(1, { message: 'Please select a service of interest.' }),
  eventDate: z.string().optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, { message: 'Please provide at least 10 characters describing your project.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' }),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
