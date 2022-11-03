require('dotenv').config()

module.exports = {
  MONGO_URL: process.env.MONGO_URL || '',
  FIRESTORE_FILE: process.env.FIRESTORE_FILE || '', 
}