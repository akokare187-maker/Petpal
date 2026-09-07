import { Species } from '../types';

export function calculateAge(birthdayStr: string): string {
  if (!birthdayStr) return '';
  const birthDate = new Date(birthdayStr);
  const today = new Date();
  
  if (isNaN(birthDate.getTime())) return '';

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }
  
  if (today.getDate() < birthDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  if (years <= 0 && months <= 0) {
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days old`;
  }

  if (years <= 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} old`;
  }

  if (months === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} old`;
  }

  return `${years}y ${months}m old`;
}

export function formatDate(isoStr: string): string {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(isoStr: string): string {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDateTime(isoStr: string): string {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '';
  return `${formatDate(isoStr)} at ${formatTime(isoStr)}`;
}

export function getSpeciesEmoji(species: Species): string {
  switch (species) {
    case 'dog':
      return '🐶';
    case 'cat':
      return '🐱';
    case 'bird':
      return '🦜';
    case 'rabbit':
      return '🐰';
    case 'hamster':
      return '🐹';
    case 'fish':
      return '🐠';
    case 'reptile':
      return '🦎';
    default:
      return '🐾';
  }
}

export function isToday(isoStr: string): boolean {
  if (!isoStr) return false;
  const d = new Date(isoStr);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export function isUpcomingWithinDays(isoStr: string, days: number = 7): boolean {
  if (!isoStr) return false;
  const d = new Date(isoStr).getTime();
  const now = Date.now();
  const maxTime = now + days * 24 * 60 * 60 * 1000;
  return d >= now && d <= maxTime;
}
