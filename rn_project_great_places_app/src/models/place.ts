class Place {
  private _id: string;
  private _title: string;
  private _imageUri: string;

  constructor(id: string, title: string, imageUri: string) {
    this._id = id;
    this._title = title;
    this._imageUri = imageUri;
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
