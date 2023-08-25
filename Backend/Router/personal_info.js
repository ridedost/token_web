const express = require("express");
const { personalInfoModel } = require("../model/PersonalInfo");
const personal_Info_Router = express.Router();

personal_Info_Router.get("/", async (req, res) => {
    try {
        const allInfo = await personalInfoModel.find();
        res.status(200).send(allInfo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

personal_Info_Router.post("/add/personal_info", async (req, res) => {
    const {name,email,address,gender,DOB,mobile} = req.body;
    try {
        const info = new personalInfoModel ({name,email,address,gender,DOB,mobile});
        const details = await info.save();
        res.status(200).send(details);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

personal_Info_Router.patch("/update/personal_info/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    
    try {
        const updatedInfo = await personalInfoModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedInfo) {
            return res.status(404).send({ message: "Personal info not found" });
        }
        res.status(200).send(updatedInfo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

personal_Info_Router.delete("/delete/personal_info/:id", async (req, res) => {
    const id = req.params.id;
    
    try {
        const deletedInfo = await personalInfoModel.findByIdAndDelete(id);
        if (!deletedInfo) {
            return res.status(404).send({ message: "Personal info not found" });
        }
        res.status(200).send({ message: "Personal info deleted" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

  module.exports = { personal_Info_Router };