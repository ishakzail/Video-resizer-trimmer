import ffmpeg from 'fluent-ffmpeg';

// Function to get the video duration 
export const getVideoDuration = async (filePath: string): Promise<number> => {
    return await new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                reject(err);
            } else {
                const duration: any = metadata.format.duration;
                if (duration) {
                    resolve(parseInt(duration));
                } else {
                    reject(new Error('Failed to retrieve video duration.'));
                }
            }
        });
    });
};
