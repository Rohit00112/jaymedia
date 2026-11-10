import { z } from 'zod';

export const registrationSchema = z.object({
  eventSlug: z.string().min(1).default('nepal-kids-idol'),
  name: z
    .string()
    .min(2, { message: 'Contestant full name is required (min 2 characters).' })
    .max(100),
  phone: z
    .string()
    .min(7, { message: 'A valid contact phone number is required.' })
    .max(20),
  gender: z.enum(['Male', 'Female', 'Others']),
  age: z.coerce
    .number()
    .int()
    .min(4, { message: 'Minimum participant age is 4 years.' })
    .max(25, { message: 'Maximum participant age for youth tier is 25.' }),
  address: z.string().min(2, { message: 'City / district / address is required.' }).max(160),
  school: z.string().min(2, { message: 'School or academy name is required.' }).max(160),
  hobbies: z.string().max(300).optional().default(''),
  parentName: z.string().min(2, { message: 'Parent or guardian name is required.' }).max(100),
  parentEmail: z
    .string()
    .email({ message: 'Please provide a valid parent email address.' })
    .optional()
    .or(z.literal('')),
  parentPhone: z.string().max(20).optional().default(''),
  termsAccepted: z.literal(true, {
    message: 'You must agree to the terms and conditions.',
  }),
  guardianAgreementAccepted: z.literal(true, {
    message: 'Participant and guardian declaration must be accepted.',
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export interface RegistrationRecord {
  userCode: string;
  eventSlug: string;
  eventTitle: string;
  name: string;
  age: number;
  gender: string;
  address: string;
  school: string;
  parentName: string;
  status: 'Verified — Audition Scheduled' | 'Pending QR Verification' | 'Shortlisted';
  auditionHub: string;
  submittedAt: string;
}

