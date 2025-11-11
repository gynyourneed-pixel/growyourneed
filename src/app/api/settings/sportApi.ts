export interface SportSettings {
    stravaIntegration: boolean;
    defaultUnits: 'imperial' | 'metric';
    stravaClientId: string;
}

let mockSettings: SportSettings = {
    stravaIntegration: false,
    defaultUnits: 'imperial',
    stravaClientId: '',
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getSportSettings = async (): Promise<SportSettings> => {
    await delay(500);
    return { ...mockSettings };
};

export const saveSportSettings = async (settings: SportSettings): Promise<void> => {
    await delay(500);
    mockSettings = { ...settings };
};
