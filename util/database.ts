
import * as SQLite from 'expo-sqlite';

import { Place } from '@/models/place';
import { PlaceDBType } from '@/types/placeType';

const database = SQLite.openDatabaseSync('places.db');

export function init() {
  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `);
}

export function insertPlace(place: {
  title: string,
  imageUri: string,
  address: string | null,
  lat: number,
  lng: number

}) {
  return database.runAsync(
    `
            INSERT INTO places (title, imageUri, address, lat, lng)
            VALUES (?, ?, ?, ?, ?)
        `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.lat,
      place.lng
    ]
  );
}

export async function fetchPlaces() {
  const result = await database.getAllAsync(
    "SELECT * FROM places"
  ) as PlaceDBType[];

  const places: Place[] = [];

  for (const dp of result) {
    places.push(
      new Place(
        dp.title,
        dp.imageUri,
        dp.address,
        dp.lat,
        dp.lng,
        dp.id
      )
    );
  }
  return places;
}
export async function fetchPlaceDetails(id: number) {
  const dbPlace = await database.getFirstAsync(
    "SELECT * FROM places WHERE id = ?",
    [id]
  ) as PlaceDBType;

  const place = new Place(
    dbPlace.title,
    dbPlace.imageUri,
    dbPlace.address,
    dbPlace.lat,
    dbPlace.lng,
    dbPlace.id
  );

  return place;
}
export async function updatePlace(id: number, updatedData: {
  title: string;
  imageUri: string;
  address: string | null;
  lat: number;
  lng: number;
}) {
  console.log(updatedData)
  const { title, imageUri, address, lat, lng } = updatedData;

  // Build the SET clause dynamically based on provided fields
  const setClauses = [];
  const params = [];

  if (title) {
    setClauses.push('title = ?');
    params.push(title);
  }
  if (imageUri) {
    setClauses.push('imageUri = ?');
    params.push(imageUri);
  }
  if(address){
  setClauses.push('address = ?');
  params.push(address);
  }
  if (lat !== undefined) {
    setClauses.push('lat = ?');
    params.push(lat);
  }
  if (lng !== undefined) {
    setClauses.push('lng = ?');
    params.push(lng);
  }

  // Ensure there's at least one field to update
  if (setClauses.length === 0) {
    throw new Error('No valid fields provided for update');
  }

  // Add the ID to the parameters
  params.push(id);

  // Construct the SQL query
  const query = `
    UPDATE places
    SET ${setClauses.join(', ')}
    WHERE id = ?
  `;

  // Execute the update query
  try {
    await database.runAsync(query, params);
    console.log('Place updated successfully');
  } catch (error) {
    console.error('Error updating place:', error);
  }
}
export async function deletePlace(id: number) {
  const query = `
   DELETE FROM places WHERE id = ?
   `
  try {
    await database.runAsync(query, [id]);
    console.log('Place deleted successfully');
  } catch (error) {
    console.error('Error deleting place:', error);
  }
}