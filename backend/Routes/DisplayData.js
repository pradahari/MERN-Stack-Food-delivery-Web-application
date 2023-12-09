const express = require("express");
const router = express.Router();
router.post("/foodData",(req,res)=>{
    try {
        res.send([global.fooditems,global.foodcategory])
        console.log(global.fooditems)
    } catch (error) {
        
    }
})



module.exports = router;