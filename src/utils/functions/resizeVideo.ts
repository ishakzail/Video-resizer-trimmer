import ffmpeg from 'fluent-ffmpeg';

// Function to resize the video using FFmpeg
export const resizeVideo = async (
    inputPath: string, outputPath: string, 
    width: number, height: number
    ) => {
    return await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
            .size(`${width}x${height}`)
            .output(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
};