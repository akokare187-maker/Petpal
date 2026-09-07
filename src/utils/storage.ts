import {
  Pet,
  FeedingLog,
  ActivityLog,
  Appointment,
  Reminder,
  PhotoItem,
  PetNote,
} from '../types';
import {
  INITIAL_PETS,
  INITIAL_FEEDINGS,
  INITIAL_ACTIVITIES,
  INITIAL_APPOINTMENTS,
  INITIAL_REMINDERS,
  INITIAL_PHOTOS,
  INITIAL_NOTES,
} from '../data/initialData';

const STORAGE_KEYS = {
  PETS: 'petpal_pets_v1',
  FEEDINGS: 'petpal_feedings_v1',
  ACTIVITIES: 'petpal_activities_v1',
  APPOINTMENTS: 'petpal_appointments_v1',
  REMINDERS: 'petpal_reminders_v1',
  PHOTOS: 'petpal_photos_v1',
  NOTES: 'petpal_notes_v1',
  ACTIVE_PET_ID: 'petpal_active_pet_id_v1',
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

export function loadAppState() {
  const pets = safeGet<Pet[]>(STORAGE_KEYS.PETS, INITIAL_PETS);
  const feedings = safeGet<FeedingLog[]>(STORAGE_KEYS.FEEDINGS, INITIAL_FEEDINGS);
  const activities = safeGet<ActivityLog[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  const appointments = safeGet<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  const reminders = safeGet<Reminder[]>(STORAGE_KEYS.REMINDERS, INITIAL_REMINDERS);
  const photos = safeGet<PhotoItem[]>(STORAGE_KEYS.PHOTOS, INITIAL_PHOTOS);
  const notes = safeGet<PetNote[]>(STORAGE_KEYS.NOTES, INITIAL_NOTES);
  const savedActivePetId = safeGet<string | null>(STORAGE_KEYS.ACTIVE_PET_ID, null);

  const activePetId =
    savedActivePetId && pets.some((p) => p.id === savedActivePetId)
      ? savedActivePetId
      : pets[0]?.id || '';

  return {
    pets,
    feedings,
    activities,
    appointments,
    reminders,
    photos,
    notes,
    activePetId,
  };
}

export function savePets(pets: Pet[]) {
  safeSet(STORAGE_KEYS.PETS, pets);
}

export function saveFeedings(feedings: FeedingLog[]) {
  safeSet(STORAGE_KEYS.FEEDINGS, feedings);
}

export function saveActivities(activities: ActivityLog[]) {
  safeSet(STORAGE_KEYS.ACTIVITIES, activities);
}

export function saveAppointments(appointments: Appointment[]) {
  safeSet(STORAGE_KEYS.APPOINTMENTS, appointments);
}

export function saveReminders(reminders: Reminder[]) {
  safeSet(STORAGE_KEYS.REMINDERS, reminders);
}

export function savePhotos(photos: PhotoItem[]) {
  safeSet(STORAGE_KEYS.PHOTOS, photos);
}

export function saveNotes(notes: PetNote[]) {
  safeSet(STORAGE_KEYS.NOTES, notes);
}

export function saveActivePetId(id: string) {
  safeSet(STORAGE_KEYS.ACTIVE_PET_ID, id);
}

export function resetToDemoData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.PETS);
    localStorage.removeItem(STORAGE_KEYS.FEEDINGS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.REMINDERS);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PET_ID);
  } catch (e) {
    console.error(e);
  }
}
