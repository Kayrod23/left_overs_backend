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
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
};

const db = pgp(cn);

module.exports = db;
