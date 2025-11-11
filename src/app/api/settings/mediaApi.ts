export interface MediaSettings {
    allowDownloads: boolean;
    defaultQuality: '480p' | '720p' | '1080p' | '4k';
    cdnProvider: 'auto' | 'cloudflare' | 'fastly' | 'aws_cloudfront';
}

let mockSettings: MediaSettings = {
    allowDownloads: true,
    defaultQuality: '1080p',
    cdnProvider: 'auto',
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getMediaSettings = async (): Promise<MediaSettings> => {
    await delay(600);
    return { ...mockSettings };
};

export const saveMediaSettings = async (settings: MediaSettings): Promise<void> => {
    await delay(600);
    mockSettings = { ...settings };
};
