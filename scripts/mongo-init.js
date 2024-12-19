db = db.getSiblingDB('image_processor_mongo');

db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [{ role: 'root', db: 'admin' }],
});

db.createCollection('tasks');
db.createCollection('images');

print('Database initialized successfully.');
