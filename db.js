const sql = require('mssql');

// const config = {
//   server: '202.28.34.203',
//   database: 'PRYMANIA_DB',
//   user: 'DB_demo5',
//   password: 'DB_demo5',
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
// };
const config = {
  server: '45.144.165.90',
  database: 'WIRAPHONG_DB',
  user: 'Demo2049',
  password: 'Max2003_01',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = {
  connectDB,
};