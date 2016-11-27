import Datastore from 'nedb-promise';

const db = Datastore({
   filename: 'battleTags.json',
   autoload: true
});

export default db;
