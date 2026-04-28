import { config } from "dotenv";
import { connectDB } from "../lib/db/connection";
import Admin from "../lib/db/models/Admin";

config({ path: ".env.local" });

async function seedAdmin() {
  try {
    console.log("🔄 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected");

    const adminEmail = "admin@techinrent.com";

    console.log(`🔍 Checking if admin exists: ${adminEmail}`);
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️  Admin already exists. Skipping seed.");
      process.exit(0);
    }

    console.log("🔄 Creating first admin user...");
    const admin = await Admin.create({
      name: "Admin",
      email: adminEmail,
      password: "Admin@12345", 
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
    console.log(`📧 Email: ${admin.email}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log(`🔑 Password: Admin@12345`);
    console.log("\n⚠️  Please change the password after first login.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
