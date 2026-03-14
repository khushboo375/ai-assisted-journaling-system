const express = require("express");
const router = express.Router();
const db = require("../database/db");
const analyzeEmotion = require("../services/llmService");


// CREATE JOURNAL ENTRY
router.post("/", async (req, res) => {

  const { userId, ambience, text } = req.body;

  if (!userId || !ambience || !text) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {

    const aiResult = await analyzeEmotion(text);

    const cleaned = aiResult
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    const stmt = db.prepare(`
      INSERT INTO journals (userId, ambience, text, emotion, keywords, summary)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      userId,
      ambience,
      text,
      parsed.emotion,
      JSON.stringify(parsed.keywords),
      parsed.summary
    );

    res.json({
      message: "Journal entry created with AI analysis",
      id: result.lastInsertRowid,
      analysis: parsed
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Journal creation failed" });

  }

});


// GET JOURNAL ENTRIES
router.get("/:userId", (req, res) => {

  const { userId } = req.params;

  const stmt = db.prepare(`
    SELECT * FROM journals
    WHERE userId = ?
    ORDER BY createdAt DESC
  `);

  const rows = stmt.all(userId);

  res.json(rows);

});


// ANALYZE JOURNAL EMOTION
router.post("/analyze", async (req, res) => {

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {

    const result = await analyzeEmotion(text);

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    res.json({
      analysis: parsed
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "AI analysis failed" });

  }

});


router.get("/insights/:userId", (req, res) => {

  const { userId } = req.params;

  try {

    const totalStmt = db.prepare(`
      SELECT COUNT(*) as totalEntries
      FROM journals
      WHERE userId = ?
    `);

    const emotionStmt = db.prepare(`
      SELECT emotion, COUNT(*) as count
      FROM journals
      WHERE userId = ?
      AND emotion IS NOT NULL
      GROUP BY emotion
      ORDER BY count DESC
    `);

    // NEW: ambience distribution query
    const ambienceStmt = db.prepare(`
      SELECT ambience, COUNT(*) as count
      FROM journals
      WHERE userId = ?
      GROUP BY ambience
    `);

    const keywordStmt = db.prepare(`
      SELECT keywords
      FROM journals
      WHERE userId = ?
      AND keywords IS NOT NULL
    `);

    const total = totalStmt.get(userId);
    const emotions = emotionStmt.all(userId);
    const ambienceUsage = ambienceStmt.all(userId);
    const keywordRows = keywordStmt.all(userId);

    // emotion distribution
    const emotionDistribution = {};

    emotions.forEach(e => {
      emotionDistribution[e.emotion] = e.count;
    });

    // keywords
    let keywords = [];

    keywordRows.forEach(row => {
      const parsed = JSON.parse(row.keywords);
      keywords = keywords.concat(parsed);
    });

    const uniqueKeywords = [...new Set(keywords)];

    res.json({
      totalEntries: total.totalEntries,
      topEmotion: emotions.length ? emotions[0].emotion : null,
      emotionDistribution,
      ambienceUsage,   // IMPORTANT
      recentKeywords: uniqueKeywords.slice(0, 5)
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Insights calculation failed" });

  }

});

module.exports = router;