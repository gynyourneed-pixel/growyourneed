export interface MessagingSettings {
    readReceipts: boolean;
    typingIndicators: boolean;
    retentionDays: number;
}

let mockSettings: MessagingSettings = {
    readReceipts: true,
    typingIndicators: true,
    retentionDays: 365,
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getMessagingSettings = async (): Promise<MessagingSettings> => {
    await delay(300);
    return { ...mockSettings };
};

export const saveMessagingSettings = async (settings: MessagingSettings): Promise<void> => {
    await delay(300);
    mockSettings = { ...settings };
};
