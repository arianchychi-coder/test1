const { sql, poolParamis } = require("../utilities/mssql_database");

const handleChatMessage = async (req, res) => {
  const userMessage = req.body.message?.toLowerCase().trim();
  if (!userMessage) return res.json({ reply: "لطفاً پیامت رو بنویس 😊" });

  try {
    const pool = await poolParamis;

                 if (userMessage.includes("سلام")) {
      return res.json({reply:"سلام! 👋 چطور می‌تونم کمکت کنم؟"})
    }
    if (userMessage.includes("درود")) {
      return res.json({reply:"درود! 👋 چطور می‌تونم کمکت کنم؟"})
    }

    if (userMessage.includes("کد ملی")) {
      return res.json({reply:`متاسفم من نمیتونم اطلاعات شخصی افراذ رو فاش کنم`})
    }
    
        if (userMessage.includes("خداحافظ")) {
      return res.json({reply:"خداحافظ! 🌸 موفق باشی."})
    }

    // اگر کاربر گفت "اطلاعات علی"
    if (userMessage.includes("اطلاعات")) {
      // جدا کردن اسم از جمله
      const name = userMessage.replace("اطلاعات", "").trim();

      if (!name) {
        return res.json({ reply: "اسم شخص رو هم بنویس 😊 مثلاً: اطلاعات علی" });
      }

        

      const result = await pool
        .request()
        .input("name", sql.NVarChar, name)
        .query("SELECT * FROM Table_1 WHERE first_name = @name");

      if (result.recordset.length === 0) {
        return res.json({ reply: `متأسفم 😕 هیچ اطلاعاتی برای "${name}" پیدا نکردم.` });
      }

      const person = result.recordset[0];

      const reply = `
        اطلاعات ${person.first_name} ${person.last_name}:
        🎓 سطح تحصیلات: ${person.education_level}
        📞 شماره تماس: ${person.student_phone}
      `;

      return res.json({ reply });
    }

     // 💡 پاسخ‌های fallback برای سؤالات ناشناخته
    const fallbackReplies = [
      "من دقیق متوجه منظورت نشدم 🤔 می‌تونی واضح‌تر بگی؟",
      "می‌خوای برام توضیح بدی منظورت چیه؟ 😊",
      "مطمئن نیستم متوجه شدم 😅 می‌تونی یه مثال بزنی؟",
      "جالبه! بیشتر توضیح می‌دی؟ 🤓",
      "من هنوز یاد می‌گیرم! 🌱 لطفاً دوباره بپرس به یه روش دیگه."
    ];

    // اگر هیچ شرطی نخورده باشه:
    return res.json({
      reply: fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)]
    });

  } catch (err) {
    console.error("DB Error:", err);
    res.json({ reply: "مشکلی پیش اومد 😕 دوباره امتحان کن." });
  }
};

module.exports = { handleChatMessage };
