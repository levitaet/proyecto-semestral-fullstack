import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;
const JWT_SECRET= process.env.JWT_SECRET || "miclavesecreta";


const NODE_ENV = process.env.NODE_ENV;
export default { PORT, HOST, MONGODB_URI, MONGODB_DBNAME, NODE_ENV, JWT_SECRET };
