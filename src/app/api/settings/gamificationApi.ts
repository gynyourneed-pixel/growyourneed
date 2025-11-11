export interface GamificationSettings {
    gamificationEnabled: boolean;
    dailyPointCap: number;
    pointValue: number;
}

let mockSettings: GamificationSettings = {
    gamificationEnabled: true,
    dailyPointCap: 500,
    pointValue: 0.01,
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getGamificationSettings = async (): Promise<GamificationSettings> => {
    await delay(420);
    return { ...mockSettings };
};

export const saveGamificationSettings = async (settings: GamificationSettings): Promise<void> => {
    await delay(420);
    mockSettings = { ...settings };
};
