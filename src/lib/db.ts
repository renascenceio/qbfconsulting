import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

export function readData<T = any>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

export function writeData<T = any>(filename: string, data: T[]) {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export function findBy<T extends Record<string, any>>(
  filename: string,
  key: keyof T,
  value: any
): T | null {
  const items = readData<T>(filename);
  return items.find((item) => item[key] === value) || null;
}

export function upsertBy<T extends Record<string, any>>(
  filename: string,
  key: keyof T,
  value: any,
  next: T
): T {
  const items = readData<T>(filename);
  const idx = items.findIndex((item) => item[key] === value);
  if (idx >= 0) {
    items[idx] = { ...items[idx], ...next };
    writeData(filename, items);
    return items[idx];
  }
  items.push(next);
  writeData(filename, items);
  return next;
}

export function deleteBy<T extends Record<string, any>>(
  filename: string,
  key: keyof T,
  value: any
): boolean {
  const items = readData<T>(filename);
  const next = items.filter((item) => item[key] !== value);
  if (next.length === items.length) return false;
  writeData(filename, next);
  return true;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
