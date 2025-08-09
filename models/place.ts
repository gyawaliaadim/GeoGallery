export class Place {
  title: string;
  imageUri: string;
  address: string | null;
  lat: number;
  lng: number;
  id: number;

  constructor(
    title: string,
    imageUri: string,
    address: string | null,
    lat: number,
    lng: number,
    id: number
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat= lat;
    this.lng= lng;
    this.id = id;
  }
}
