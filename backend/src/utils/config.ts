import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = NODE_ENV === 'test' ? '3001' : process.env.PORT;
const HOST = process.env.HOST || "0.0.0.0";
const MONGODB_URI = NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;
const MONGODB_DBNAME = NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_DBNAME
  : process.env.MONGODB_DBNAME;
const JWT_SECRET = process.env.JWT_SECRET || "miclavesecreta";
const BASE_URL = NODE_ENV === 'test'
  ? 'http://localhost:3001'
  : (process.env.BASE_URL || "http://localhost:7103");

console.log('🔧 Config loaded:', {
  NODE_ENV,
  PORT,
  HOST,
  MONGODB_URI,
  MONGODB_DBNAME
});

export default { PORT, HOST, MONGODB_URI, MONGODB_DBNAME, NODE_ENV, JWT_SECRET, BASE_URL };
