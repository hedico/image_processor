import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_DIR = 'output';
const RESOLUTIONS = [1024, 800];

export const processImageFomPath = async (imagePath: string): Promise<void> => {
  try {
    // Check if out folder exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    if (!fs.existsSync(imagePath)) {
      const error: Error = {
        name: 'IMAGE_PROCESS_FAILED',
        message: 'The image to process does not exists'
      };
      console.log(error);
    }

    // We get the name of the file to create the new folder inside output
    const fileName = path.basename(imagePath);
    const fileExtension = path.extname(fileName).toLowerCase();
    const fileNameNoExt = path.parse(fileName).name;

    if (!fs.existsSync(`${OUTPUT_DIR}/${fileNameNoExt}`)) {
      fs.mkdirSync(`${OUTPUT_DIR}/${fileNameNoExt}`);
    }

    // We check if sharp can access the resource
    await sharp(imagePath)
      .metadata()
      .catch((err: any) => {
        const error = {
          name: 'IMAGE_PROCESS_FAILED',
          message: `${err.message}. The image is corrupt or incomplete.`
        };
        fs.rmdirSync(`${OUTPUT_DIR}/${fileNameNoExt}`);
        return error;
      });

    const outputPaths = await RESOLUTIONS.reduce(async (accP, resolution) => {
      const acc = await accP;
      const outputPath = path.join(
        `${OUTPUT_DIR}/${fileNameNoExt}`,
        `${fileNameNoExt}-${resolution}${fileExtension}`
      );

      // Action in the image to create new resolution
      await sharp(imagePath).resize(resolution).toFile(outputPath);

      return { ...acc, outputPath };
    }, Promise.resolve([] as string[]));

    console.log(outputPaths);
  } catch (err: any) {
    const error: Error = {
      name: 'IMAGE_PROCESS_FAILED',
      message: err.message
    };
    console.log(error);
  }
};
