import axios from 'axios';
import fs from 'fs';
import path from 'path';

const inputDir = 'input/';

export const downloadImage = async (imgUrl: string): Promise<string | Error> => {
  try {
    // We need to validate that the directory for input exists
    if (!fs.existsSync(inputDir)) {
      fs.mkdirSync(inputDir);
    }

    const fileName = path.basename(new URL(imgUrl).pathname);
    const filePath = path.join(inputDir, fileName);

    const imageStream = await axios({
      url: imgUrl,
      responseType: 'stream'
    });

    imageStream.data.pipe(fs.createWriteStream(filePath));

    return new Promise((resolve, reject) => {
      imageStream.data.on('end', resolve(filePath));
      imageStream.data.on(
        'error',
        reject({
          name: 'INTERNAL_ERROR',
          message: 'An error ocurred in img downloading'
        })
      );
    });
  } catch (err: any) {
    const error: Error = {
      name: 'INTERNAL_ERROR',
      message: err.message
    };
    return error;
  }
};
