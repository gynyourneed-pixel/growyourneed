export interface HobbiesSettings {
    userGroups: boolean;
    moderationLevel: 'low' | 'auto' | 'high';
    eventbriteApi: string;
}

let mockSettings: HobbiesSettings = {
    userGroups: true,
    moderationLevel: 'auto',
    eventbriteApi: '',
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getHobbiesSettings = async (): Promise<HobbiesSettings> => {
    await delay(450);
    return { ...mockSettings };
};

export const saveHobbiesSettings = async (settings: HobbiesSettings): Promise<void> => {
    await delay(450);
    mockSettings = { ...settings };
};
