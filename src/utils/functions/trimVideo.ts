import ffmpeg from 'fluent-ffmpeg';

export const  trimVideo = async ( 
    filePath: string, outputPath : string, startTime: number, endTime:number)  => {
    try {
        // Trim the video using ffmpeg
        await new Promise<void>((resolve, reject) => {
            ffmpeg(filePath)  // Use the path of the temporary file
                .setStartTime(startTime)
                .setDuration(endTime - startTime)
                .output(outputPath)
                .on('end', () => {
                    resolve();
                })
                .on('error', (err) => {
                    reject(err);
                })
                .run();
        });

    } catch (error) {
        throw error;
    }
}