export interface HelpSettings {
    liveChat: boolean;
    responseSla: number;
}

let mockSettings: HelpSettings = {
    liveChat: true,
    responseSla: 24,
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getHelpSettings = async (): Promise<HelpSettings> => {
    await delay(380);
    return { ...mockSettings };
};

export const saveHelpSettings = async (settings: HelpSettings): Promise<void> => {
    await delay(380);
    mockSettings = { ...settings };
};
