const router = require("express").Router();
const Trending = require("../models/Trending");
const puppeteer = require("puppeteer");
const storage = require("../firebase");

//create trend

router.post("/", async (req, res) => {
  const { url, webName } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: `ss/${webName}.png` })
  await browser.close();

  const trending = new Trending({
    url,
    webName,
    homeImg: "",
  });
  await trending.save();
  res.status(200).json(trending);
});

//get all trends

router.get("/all/trending", async (req, res) => {
  try {
    const alltrendings = await Trending.find();
    res.status(200).json(alltrendings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
