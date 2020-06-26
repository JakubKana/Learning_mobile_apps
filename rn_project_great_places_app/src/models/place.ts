class Place {
  private _id: string;
  private _title: string;
  private _imageUri: string;
  private _address: string;
  private _lat: number;
  private _lng: number;

  constructor(id: string, title: string, imageUri: string, address: string, lat: number, lng: number) {
    this._id = id;
    this._title = title;
    this._imageUri = imageUri;
    this._address = address;
    this._lat = lat;
    this._lng = lng;
  }

  get lng(): number {
    return this._lng;
  }

  get lat(): number {
    return this._lat;
  }

  get address(): string {
    return this._address;
  }

  get imageUri() {
    return this._imageUri;
  }

  get title() {
    return this._title;
  }

  get id() {
    return this._id;
  }
}

export { Place };
