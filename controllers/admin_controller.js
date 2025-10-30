const sumbitemodel = require("../models/sumbite_model");

const getadmin = async (req, res) => {
  try {
    // از مدل مستقیماً دیتا بگیر
    const admin = await sumbitemodel.getSumbite();
    res.json(admin);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).send("خطا در گرفتن فیلد");
  }
};

const postadmin = async (req, res) => {
  try {
    // مستقیماً از کنترلر دیگر برای POST استفاده کن
    const { postSumbite } = require("./summbite_controllers");
    await postSumbite(req, res);
  } catch (error) {
    console.error("Error posting admin data:", error);
    res.status(500).send("خطا در ثبت فیلد");
  }
};

module.exports = { getadmin, postadmin };
