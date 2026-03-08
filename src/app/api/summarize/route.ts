import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini Key Missing" }, { status: 500 });
        }

        const { player } = await req.json();
        
        // Helper to calculate averages from your game_stats array
        const stats = player.game_stats || [];
        const getAvg = (key: string) => 
            stats.length ? (stats.reduce((acc: number, curr: any) => acc + (curr[key] || 0), 0) / stats.length).toFixed(1) : "0.0";

        const ppg = getAvg('points');
        const threes = getAvg('threes_made');
        const twos = getAvg('twos_made');

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const gameLog = (player.game_stats || [])
                    .map((g: any) => `- ${g.game_date}: ${g.points} PTS vs ${g.game_name}, (${g.twos_made} 2PM, (${g.threes_made} 3PM, ${g.fouls} PF)`)
                    .join("\n");

        const prompt = `
        Act as a professional NCAA Division I basketball scout. 
        Write a high-level scouting report (100-150 words) for ${player.name}.
        
        PLAYER PROFILE:
        - Position: ${player.position}
        - School: ${player.school}
        - Grad Year: ${player.grad_year}
        
        STATISTICAL AVERAGES (Across ${stats.length} games):
        - Scoring: ${ppg} PPG
        - Efficiency: ${threes} 3PM/game, ${twos} 2PM/game
        - Fouls: ${getAvg('fouls')} per game

        DETAILED GAME LOG:
        ${gameLog || "No game data available."}
        
        REQUIREMENTS:
        1. Interpret the data (e.g., if PPG is high, mention "scoring gravity").
        2. Use pro terminology: "verticality," "spacing," "three-level scorer."
        3. Mention they are a Class of ${player.grad_year} prospect.
        4. Analyze the TRENDS. (e.g., "Exploded for 37 points against Dover Bay, showing elite ceiling").
        5. Identify if they are consistent or a "streak" scorer based on the points listed.
        6. Mention specific opponents if they had a standout performance against them.
        . End with a "Projected Ceiling" (e.g., "High-major starter").
        
        TONE: Analytical, scout-like, and concise.
        
        TONE: Objective, analytical, and concise.
        `;

        const result = await model.generateContent(prompt);
        const summaryText = result.response.text();

        return NextResponse.json({ summary: summaryText });

    } catch (error) {
        console.error("Gemini Error: ", error);
        return NextResponse.json({ error: "AI summary failed" }, { status: 500 });
    }
}