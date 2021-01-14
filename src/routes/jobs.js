const { Router } = require("express");
const router = Router();
const Request = require("request");

router.get("/", (req, res) => {
  Request.post(
    {
      headers: { "content-type": "application/json" },
      url: `https://search.torre.co/opportunities/_search/?size=30`
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      res.json(JSON.parse(body));
    }
  );
});

router.get("/:id", (req, res) => {
  const opportunityId = req.params.id;
  Request.get(
    `https://torre.co/api/opportunities/${opportunityId}`,
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      res.json(JSON.parse(body));
    }
  )
})

module.exports = router;
