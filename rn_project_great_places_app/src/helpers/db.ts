import SQLite, { ResultSet } from "react-native-sqlite-storage";
import { Transaction, SQLError } from "react-native-sqlite-storage";

const db = async () => await SQLite.openDatabase({ name: "places.db", location: "default" });

export const init = (): Promise<unknown> => {
  const dbPromise = new Promise((resolve, reject) => {
    db().then(database => {
      database.transaction((tx: Transaction) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
          [],
          () => {
            resolve();
          },
          (_tx: Transaction, error: SQLError) => {
            reject(error);
          },
        );
      });
    });
  });
  return dbPromise;
};

export const insertPlace = (
  title: string,
  imageUri: string,
  address: string,
  lat: number,
  lng: number,
): Promise<ResultSet> => {
  const dbPromise = new Promise<ResultSet>((resolve, reject) => {
    db().then(database => {
      database.transaction((tx: Transaction) => {
        tx.executeSql(
          "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);",
          [title, imageUri, address, lat, lng],
          (_tx, result) => {
            resolve(result);
          },
          (_tx: Transaction, error: SQLError) => {
            reject(error);
          },
        );
      });
    });
  });
  return dbPromise;
};

export const fetchPlaces = (): Promise<ResultSet> => {
  const dbPromise = new Promise<ResultSet>((resolve, reject) => {
    db().then(database => {
      database.transaction((tx: Transaction) => {
        tx.executeSql(
          "SELECT id, title, imageUri, address, lat, lng FROM places;",
          [],
          (_tx, result) => {
            resolve(result);
          },
          (_tx: Transaction, error: SQLError) => {
            reject(error);
          },
        );
      });
    });
  });
  return dbPromise;
};
