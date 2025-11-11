export interface CalendarSettings {
    publicHolidays: boolean;
    allowPublicEvents: boolean;
    defaultDuration: number;
}

let mockSettings: CalendarSettings = {
    publicHolidays: true,
    allowPublicEvents: false,
    defaultDuration: 60,
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getCalendarSettings = async (): Promise<CalendarSettings> => {
    await delay(400);
    return { ...mockSettings };
};

export const saveCalendarSettings = async (settings: CalendarSettings): Promise<void> => {
    await delay(400);
    mockSettings = { ...settings };
};
