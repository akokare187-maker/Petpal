export type Species = 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'fish' | 'reptile' | 'other';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed?: string;
  birthday: string; // YYYY-MM-DD
  gender: 'male' | 'female' | 'unknown';
  isNeutered: boolean;
  weight?: number; // in lbs or kg
  weightUnit: 'lbs' | 'kg';
  color?: string;
  microchipId?: string;
  photoUrl: string;
  allergies?: string[];
  personalityTags: string[];
  emergencyContact?: {
    clinicName: string;
    phone: string;
    vetName?: string;
    address?: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
  };
  notes?: string;
  createdAt: string;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Medication' | 'Supplement';

export interface FeedingLog {
  id: string;
  petId: string;
  timestamp: string; // ISO string
  mealType: MealType;
  foodBrand: string;
  amount: string; // e.g. "1 cup", "150g", "1 can"
  waterRefreshed?: boolean;
  notes?: string;
}

export type ActivityType = 'Walk' | 'Run' | 'Playtime' | 'Dog Park' | 'Training' | 'Agility' | 'Cuddle' | 'Other';

export interface ActivityLog {
  id: string;
  petId: string;
  timestamp: string; // ISO string
  activityType: ActivityType;
  durationMinutes: number;
  distanceMiles?: number;
  didPee?: boolean;
  didPoop?: boolean;
  energyLevel?: 'calm' | 'playful' | 'energetic' | 'tired';
  notes?: string;
}

export type AppointmentType = 'Checkup' | 'Vaccination' | 'Grooming' | 'Dental' | 'Surgery' | 'Training' | 'Emergency' | 'Other';
export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  petId: string;
  title: string;
  appointmentType: AppointmentType;
  dateTime: string; // ISO string
  locationClinic: string;
  vetDoctor?: string;
  phone?: string;
  cost?: number;
  status: AppointmentStatus;
  notes?: string;
}

export type ReminderType = 'Medication' | 'Feeding' | 'Walk' | 'Flea & Tick' | 'Vaccine' | 'Grooming' | 'Teeth Cleaning' | 'Other';
export type ReminderFrequency = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Reminder {
  id: string;
  petId: string;
  title: string;
  type: ReminderType;
  dueDateTime: string; // ISO string
  frequency: ReminderFrequency;
  isCompleted: boolean;
  completedAt?: string;
  notes?: string;
}

export interface PhotoItem {
  id: string;
  petId: string;
  url: string;
  caption?: string;
  tag?: 'Puppyhood' | 'Adventure' | 'Funny' | 'Sleeping' | 'Groomed' | 'Portraits' | 'General';
  dateAdded: string; // ISO string
  isFavorite: boolean;
}

export type NoteCategory = 'Medical' | 'Diet & Allergies' | 'Behavior' | 'Emergency' | 'Routine' | 'Insurance' | 'General';

export interface PetNote {
  id: string;
  petId: string;
  title: string;
  category: NoteCategory;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPinned?: boolean;
}

export type TimelineEventCategory = 'feeding' | 'walk' | 'appointment' | 'reminder' | 'photo' | 'note';

export interface TimelineEvent {
  id: string;
  petId: string;
  category: TimelineEventCategory;
  title: string;
  description: string;
  timestamp: string;
  badge?: string;
  meta?: Record<string, any>;
}
