export interface EventsSettings {
    allowSubmissions: boolean;
    serviceFee: number;
    ticketmasterApi: string;
}

let mockSettings: EventsSettings = {
    allowSubmissions: false,
    serviceFee: 2.5,
    ticketmasterApi: '',
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getEventsSettings = async (): Promise<EventsSettings> => {
    await delay(480);
    return { ...mockSettings };
};

export const saveEventsSettings = async (settings: EventsSettings): Promise<void> => {
    await delay(480);
    mockSettings = { ...settings };
};
