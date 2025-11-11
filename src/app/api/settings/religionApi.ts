export interface ReligionSettings {
    defaultTranslation: 'sahih_international' | 'yusuf_ali' | 'pickthall' | 'shakir';
    prayerMethod: 'mwl' | 'isna' | 'egyptian' | 'karachi';
}

let mockSettings: ReligionSettings = {
    defaultTranslation: 'sahih_international',
    prayerMethod: 'mwl',
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getReligionSettings = async (): Promise<ReligionSettings> => {
    await delay(350);
    return { ...mockSettings };
};

export const saveReligionSettings = async (settings: ReligionSettings): Promise<void> => {
    await delay(350);
    mockSettings = { ...settings };
};
