// components/PlayerCard.tsx

// general data for PlayerCard component
interface PlayerInfo{
    name: string;
    height: string;
    school: string;
    grad:string;

    ppg: number;
    rpg: number;
    apg: number;

    aiArchetype: string;
    starRating: number;
    aiSummarization: string;
}

export default function PlayerCard({name, height, school, grad, ppg, rpg, apg, aiArchetype, starRating, aiSummarization}: PlayerInfo) {

}


