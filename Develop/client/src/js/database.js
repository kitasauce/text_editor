import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'eadwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.done;
  console.log('Content added to database');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'eadonly');
  const store = tx.objectStore('jate');
  const data = await store.getAll();
  await tx.done;
  console.log("data read from database");
  return data.map((item) => item.content);
}

initdb();
