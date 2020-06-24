class DbPlace {
  private _id: string;
  private _address: string;
  private _title: string;
  private _imageUri: string;
  private _lat: number;
  private _lng: number;

  constructor(id: string, address: string, title: string, imageUri: string, lat: number, lng: number) {
    this._id = id;
    this._title = title;
    this._imageUri = imageUri;
    this._lat = lat;
    this._lng = lng;
    this._address = address;
  }

  get imageUri() {
    return this._imageUri;
  }

  get address() {
    return this._address;
  }
  get title() {
    return this._title;
  }

  get id() {
    return this._id;
  }
  get lat() {
    return this._lat;
  }

  get lng() {
    return this._lng;
  }

  set lat(newVal) {
    this._lat = newVal;
  }
  set lng(newVal) {
    this._lng = newVal;
  }
  set id(newVal) {
    this._id = newVal;
  }
  set title(newVal) {
    this._title = newVal;
  }
  set imageUri(newVal) {
    this._imageUri = newVal;
  }
  set address(newVal) {
    this._address = newVal;
  }
}

export { DbPlace };
