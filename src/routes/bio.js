const { Router } = require("express");
const router = Router();
const Request = require("request");

router.get("/", (req, res) => {
  Request.post(
    {
      headers: { "content-type": "application/json" },
      url: `https://search.torre.co/people/_search/?size=30`
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      res.json(JSON.parse(body));
    }
  );
});

router.get("/:username", (req, res) => {
  const username = req.params.username;
  Request.get(
    `https://bio.torre.co/api/bios/${username}`,
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      res.json(JSON.parse(body));
    }
  );
});

module.exports = router;
