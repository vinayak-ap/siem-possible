import { NextResponse } from "next/server";
import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config(); // Load environment variables

// 🔹 Create Bedrock LLM
function createBedrockLLM() {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("Missing AWS Credentials in .env.local");
  }

  return new BedrockChat({
    model: "anthropic.claude-3-5-sonnet-20240620-v1:0",
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

// 🔹 API Route Handler
export async function POST(req: Request) {
  try {
    // Parse JSON request body
    const body = await req.json();
    const { setpoint, productiontype, operation } = body;

    // Validate required parameters
    if (!setpoint || !productiontype || !operation) {
      return NextResponse.json(
        { error: "Missing required parameters: setpoint, productiontype, operation" },
        { status: 400 }
      );
    }

    const model = createBedrockLLM();

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a knowledgeable assistant specializing in recipe management and equipment selection. Your goal is to optimize cost and time based on customer production needs. \n\n"
        + "1️**If the customer wants faster production**, choose the best-case scenario equipment. \n"
        + "2️**If efficiency is the priority**, select cost-effective equipment. \n\n"
        + "Ensure the selected equipment **operates within the given setpoint {setpoint} and is relevant to the {operation}**. \n"
        + " Do NOT suggest unrelated equipment. \n\n"
        + " **Output Format (JSON Only give json .. nothing else only json )**:\n"
        + "'equipment': 'boiler', 'description': 'short description, saved X% cost/time (e.g., 25 rs/h or X days per unit production)'"
      ],
      [
        "human",
        "Production type: {productiontype} \n"
        + "Setpoint: {setpoint} \n"
        + "Operation: {operation} \n"
        + "Available equipment: {input}"
      ],
    ]);

    const chain = prompt.pipe(model);

    const equipment_table = [
      { "equipment_name": "Green Coffee Cleaner", "alternative_set_points": "Airflow rate: 700–900 m³/h", "estimated_operating_cost_per_hour_usd": 12 },
      { "equipment_name": "Destoner", "alternative_set_points": "Vibration frequency: 60 Hz", "estimated_operating_cost_per_hour_usd": 10 },
      { "equipment_name": "Weighing and Dosing Unit", "alternative_set_points": "Accuracy: ±0.05%", "estimated_operating_cost_per_hour_usd": 7 },
      { "equipment_name": "Pre-Roast Storage Silo", "alternative_set_points": "Capacity: 10,000 kg", "estimated_operating_cost_per_hour_usd": 3 },
      { "equipment_name": "Roaster R-502", "alternative_set_points": "Temperature: 180°C to 220°C (356°F to 392°F); Batch size: 1,000 kg", "estimated_operating_cost_per_hour_usd": 60 },
      { "equipment_name": "Roaster R-702", "alternative_set_points": "Temperature: 200°C to 220°C (392°F to 428°F); Batch size: 1,500 kg", "estimated_operating_cost_per_hour_usd": 80 },
      { "equipment_name": "Roaster R-902", "alternative_set_points": "Temperature: 160°C to 180°C (320°F to 356°F); Batch size: 500 kg", "estimated_operating_cost_per_hour_usd": 40 },
      { "equipment_name": "Cyclone Separator", "alternative_set_points": "Airflow rate: 1,500 m³/h", "estimated_operating_cost_per_hour_usd": 18 },
      { "equipment_name": "Cooling Tray", "alternative_set_points": "Ambient temperature; Cooling time: 2 minutes", "estimated_operating_cost_per_hour_usd": 12 },
      { "equipment_name": "Post-Roast Storage Silo", "alternative_set_points": "Capacity: 10,000 kg", "estimated_operating_cost_per_hour_usd": 3 },
      { "equipment_name": "Industrial Grinder", "alternative_set_points": "Grind size: Customized per brewing method; Capacity: 5,000 kg/hr", "estimated_operating_cost_per_hour_usd": 50 },
      { "equipment_name": "Instant Coffee Extractor", "alternative_set_points": "Temperature: 160°C (320°F); Pressure: 20 bar", "estimated_operating_cost_per_hour_usd": 70 },
      { "equipment_name": "Spray Dryer", "alternative_set_points": "Inlet temperature: 220°C (428°F); Outlet temperature: 100°C (212°F)", "estimated_operating_cost_per_hour_usd": 80 },
      { "equipment_name": "Agglomerator", "alternative_set_points": "Humidity: 12%; Temperature: 75°C (167°F)", "estimated_operating_cost_per_hour_usd": 60 },
      { "equipment_name": "Freeze Dryer", "alternative_set_points": "Temperature: -45°C (-49°F); Pressure: 0.05 mbar", "estimated_operating_cost_per_hour_usd": 90 },
      { "equipment_name": "Packaging Machine", "alternative_set_points": "Speed: 150 packages/minute; Nitrogen flushing", "estimated_operating_cost_per_hour_usd": 25 },
      { "equipment_name": "Metal Detector", "alternative_set_points": "Sensitivity: 1.0 mm ferrous metals", "estimated_operating_cost_per_hour_usd": 7 },
      { "equipment_name": "Checkweigher", "alternative_set_points": "Accuracy: ±0.2 g", "estimated_operating_cost_per_hour_usd": 7 },
      { "equipment_name": "Palletizer", "alternative_set_points": "Speed: 40 pallets/hour", "estimated_operating_cost_per_hour_usd": 20 },
      { "equipment_name": "Clean-in-Place System", "alternative_set_points": "Flow rate: 300 liters/minute; Temperature: 90°C (194°F)", "estimated_operating_cost_per_hour_usd": 25 }
    ];

    // Invoke the LLM with dynamic values
    const response = await chain.invoke({
      productiontype,
      setpoint,
      operation,
      input: equipment_table,
    });

    console.log("Bedrock LLM Response:", response);

    return NextResponse.json({ result: response.content });

  } catch (error) {
    console.error("Bedrock LLM Error:", error);
    return NextResponse.json({ error: "Failed to connect to AWS Bedrock" }, { status: 500 });
  }
}
