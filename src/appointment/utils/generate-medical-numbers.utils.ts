export function generateMedicalNumber(): string {
  const prefix = 'MED-';
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return prefix + random;
}
