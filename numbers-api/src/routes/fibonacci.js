const express = require("express");
const fetchData = require("../apiHandler");

const router = express.Router();

router.get("/", async (req, res) => {
    const numbers = await fetchData("fibo");
    res.json({ numbers });
});

module.exports = router;
