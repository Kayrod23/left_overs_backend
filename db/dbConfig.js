const pgp = require("pg-promise")();
require("dotenv").config();

const { DATABASE_URL } = process.env;

const cn = DATABASE_URL
?{
    connectionString: DATABASE_URL,
    max: 30,
}
: {
    host: process.env.RDS_HOSTNAME || "localhost",
    password: process.env.RDS_PASSWORD,
    user: process.env.RDS_USERNAME,
    port: process.env.RDS_PORT,
};

const db = pgp(cn);

module.exports = db;
