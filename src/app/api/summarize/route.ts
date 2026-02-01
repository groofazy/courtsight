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
        Act as a professional NCAA Division I basketball scout. 
        Write a high-level scouting report (100-150 words) for ${player.name}.
        
        DATA PROFILE:
        - Position/Size: ${player.bio.position}, ${player.bio.height} with a ${player.bio.wingspan} wingspan.
        - Archetype: ${player.aiArchetype}
        - Shooting: ${player.stats.shooting.threeP}% from 3PT, ${player.stats.shooting.ft}% from FT.
        - Playmaking: ${player.stats.astToTurnover} Assist-to-Turnover ratio.
        - Defense: ${player.stats.bpg} Blocks and ${player.stats.spg} Steals per game.
        
        REQUIREMENTS:
        1. Do not just list stats; interpret them (e.g., "Elite wingspan allows for versatile defending").
        2. Use professional terminology like "verticality," "spacing," "three-level scorer," or "secondary creator."
        3. Mention their academic standing (${player.bio.gpa} GPA) briefly if it's high.
        4. End with a "Projected Ceiling" (e.g., "High-major starter").
        
        TONE: Objective, analytical, and concise.
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