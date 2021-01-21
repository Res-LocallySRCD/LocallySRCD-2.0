const express = require("express");
const mainController = require("../controllers/mainController.js");
const router = express.Router();

// HEY ITERATION GROUP, WE HID FIVE PANDAS 🐼 SOMEWHERE IN THIS CODEBASE
// Find all 5 to claim a prize 😜😜😜😜   ^ this one DOES NOT count as ONE!

router.post("/report",
  mainController.reportClosed,
  async (req, res) => {
    return res.status(200).send({ closedStoreId: res.locals.closedStoreId });
  }
);

// dummy route for testing in apiRoute.test.js
// router.get("/test",
//   async (req, res) => {
//     return res.status(200).json({ message: 'Passed' });
//   }
// )

// dummy route for testing in apiRoute.test.js
// router.post("/testing",
//   async (req, res) => {
//     console.log('req.body in post /testing:', req.body);
//     return res.status(200).json(req.body);
//   }
// )

router.post("/",
  mainController.getClosedStores,
  mainController.getResults,
  (req, res) => {
    // console.log("back in api.js"),
    res.status(200).send({
      results: res.locals.results,
      term: res.locals.term,
      closedStoreList: res.locals.closedStoresList,
    });
  }
);

module.exports = router;
