// app/api/summarize/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


export async function POST(req: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini Key Missing"}, 
                { status: 500});
            }

        const { player } = await req.json();
        const model = genAI.getGenerativeModel(
            { model: "gemini-2.5-flash-lite" }
        ); // model for summaries

        // master prompt criteria
        // defines persona of an experienced scout
        // constrains tone to be professional and factual
        // restricts inputs on given stats and bio only
        // enforces output structure
        const masterPrompt = `
        You are an experienced collegiate and highschool basketball scout with 15+ years of recruiting
        and player evaluation experience. You write objective scouting reports for coaches and recruiting 
        staff for Canadian universities and colleges.

        Your task is to analyze structured player data (box and advanced statistics, physical attributes, position, etc)
        and product a concise professional scouting summary.

        Guidelines:
        Write in the tone of an internal scouting report, not marketing or hype.
        Be factual, specific, and evidence-based.
        Only reference information explictily provided in the input. Do not invent traits, personality details, or background.
        Give an accurate NBA Player comparison.
        Avoid exaggeration or emotional language.
        Use basketball terminology appropriately (efficiency, spacing, defensive versatility, motor, usage, etc.).
        Do not provide advice to the player. This is written for coaches.
        Provide an AI disclaimer at the start of your message.
        Every report must contain at least one quantified stat reference 
        (e.g., percentages, per-game numbers, or efficiency metrics).

        Output requirements:
        Length: 100-200 words.
        Format: One paragraph. Can use bullet points.

        Content Order:
        1. AI disclaimer
        2. Player profile and role/archetype
        3. Primary strengths supported by stats
        4. Development areas or limitations
        5. Projected fit or level

        If data is incomplete, say "limited data availble" rather than guessing.
        `;

        // combine with player data
        const prompt = `
        ${masterPrompt}

        PLAYER DATA TO ANALYZE:
        Name: ${player.name}
        Bio: ${player.bio.height}, ${player.bio.school}, Class of ${player.bio.grad}
        Stats: ${player.stats.ppg} PPG, ${player.stats.rpg} RPG, ${player.stats.apg} APG
        `;

        const result = await model.generateContent(prompt);
        const summaryText = result.response.text();

        return NextResponse.json({ summary: summaryText});

    } catch (error) {
        console.error("Gemini Error: ", error);
        return NextResponse.json(
            { error: "AI summary failed" },
            { status: 500}
        );
    }
}