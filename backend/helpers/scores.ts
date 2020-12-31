import { state } from "../state/gameState";

export const addToTeamScore = (playerId: string, amount: number) => {
    let playerScore = state.clientState.minigameData?.scores?.find(s => s.playerId.toLowerCase().trim() === playerId.toLowerCase().trim());

    if (!playerScore) {
        state.clientState.minigameData.scores.push({ playerId: playerId, score: 0 });
        playerScore = state.clientState.minigameData.scores[state.clientState.minigameData.scores.length - 1];
    }

    playerScore.score += amount;
}

export const isInWords = (words: string[], word: string): boolean => {
    const stripped = word.toLowerCase().replace(/ /g,'')
    return words.filter(w => stripped.includes(w.toLowerCase())).length > 0;
}