const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const SUPABASE_URL = "https://zqatolmkqdiufxayrmdd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KHPyjfsV9m7XH01K9Cf0Lg_lKtLs7nc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function parseCities() {
  const filePath = "c:\\Users\\User\\Eco-Friendly-Travel-Planner\\src\\app.js";
  let content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/const cities = \[\s*([\s\S]*?)\s*\];/);
  if (!match) {
    throw new Error("Could not find cities array in app.js");
  }
  const citiesStr = "[" + match[1] + "]";
  return eval(citiesStr);
}

function parseActivities() {
  const filePath = "C:\\Users\\User\\Downloads\\activities.csv";
  let content = fs.readFileSync(filePath, "utf-8");
  content = content.replace(/^const activities\s*=\s*/, "");
  content = content.replace(/;\s*export default activities;\s*$/, "");
  content = content.replace(/;\s*$/, "");
  content = content.replace(/\/\/[^\n]*/g, "");
  return eval(content);
}

async function run() {
  console.log("Parsing destinations...");
  const cities = parseCities();
  console.log(`Parsed ${cities.length} destinations.`);

  console.log("Parsing activities...");
  const activities = parseActivities();
  console.log(`Parsed ${activities.length} activities.`);

  // Upsert destinations in batches
  console.log("\nUploading destinations...");
  const destRows = cities.map((c) => ({
    id: c.id,
    name: c.name,
    country: c.country,
    tags: c.tags || [],
    transport: c.transport || [],
    co2: c.co2,
    price: c.price,
    duration: c.duration,
    img_url: c.img_url
  }));

  const BATCH_SIZE = 50;
  for (let i = 0; i < destRows.length; i += BATCH_SIZE) {
    const batch = destRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from("destinations").upsert(batch);
    if (error) {
      console.error(`❌ Destinations batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      return;
    } else {
      console.log(`✅ Destinations batch ${Math.floor(i / BATCH_SIZE) + 1} uploaded.`);
    }
  }

  // Upsert activities in batches
  console.log("\nUploading activities...");
  const actRows = activities.map((a) => ({
    id: a.id,
    destination_id: a.cityId,
    name: a.name,
    tags: a.tags || [],
    price: a.price,
    co2: a.co2,
    duration: a.duration,
    description: a.description
  }));

  for (let i = 0; i < actRows.length; i += BATCH_SIZE) {
    const batch = actRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from("destination_activities").upsert(batch);
    if (error) {
      console.error(`❌ Activities batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      return;
    } else {
      console.log(`✅ Activities batch ${Math.floor(i / BATCH_SIZE) + 1} uploaded.`);
    }
  }

  console.log("\nAll data uploaded successfully! 🎉");
}

run().catch(console.error);
