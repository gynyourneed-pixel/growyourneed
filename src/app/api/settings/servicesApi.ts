export interface ServicesSettings {
    backgroundChecks: boolean;
    commissionFee: number;
}

let mockSettings: ServicesSettings = {
    backgroundChecks: true,
    commissionFee: 20,
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getServicesSettings = async (): Promise<ServicesSettings> => {
    await delay(520);
    return { ...mockSettings };
};

export const saveServicesSettings = async (settings: ServicesSettings): Promise<void> => {
    await delay(520);
    mockSettings = { ...settings };
};
