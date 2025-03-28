const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Import Routes
const primeRoutes = require("./numbers-api/src/routes/even");
const fibonacciRoutes = require("./numbers-api/src/routes/fibonacci");
const evenRoutes = require("./numbers-api/src/routes/primes");
const randomRoutes = require("./numbers-api/src/routes/random");

app.use("/primes", primeRoutes);
app.use("/fibonacci", fibonacciRoutes);
app.use("/even", evenRoutes);
app.use("/random", randomRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
