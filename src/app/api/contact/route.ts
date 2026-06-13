import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create the 'messages' directory in the project root
    const messagesDir = path.join(process.cwd(), "messages");
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }

    // Generate timestamps
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, "-");
    const dateStr = now.toISOString();

    // Clean name for filename (remove non-alphanumeric characters)
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase().substring(0, 20);
    const filename = `msg_${timestamp}_${cleanName}.txt`;
    const filepath = path.join(messagesDir, filename);

    // 2. Save individual human-readable text file
    const fileContent = `Date: ${now.toLocaleString()} (${dateStr})\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
    fs.writeFileSync(filepath, fileContent, "utf-8");

    // 3. Append to a unified all_messages.csv spreadsheet in the same folder
    const csvPath = path.join(messagesDir, "all_messages.csv");
    const fileExists = fs.existsSync(csvPath);
    
    const headers = "Date,Name,Email,Message\n";
    const row = `${escapeCSV(dateStr)},${escapeCSV(name)},${escapeCSV(email)},${escapeCSV(message)}\n`;

    if (!fileExists) {
      fs.writeFileSync(csvPath, headers + row, "utf-8");
    } else {
      fs.appendFileSync(csvPath, row, "utf-8");
    }

    return NextResponse.json({
      success: true,
      message: "Message saved locally inside the 'messages' folder.",
      filename,
    });
  } catch (err: any) {
    console.error("API handler error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function escapeCSV(val: string): string {
  if (!val) return "";
  // Escape quotes according to CSV standards (RFC 4180)
  const replaced = val.replace(/"/g, '""');
  // Wrap in double quotes if there are commas, newlines or quotes
  if (replaced.includes(",") || replaced.includes("\n") || replaced.includes("\r") || replaced.includes('"')) {
    return `"${replaced}"`;
  }
  return replaced;
}
