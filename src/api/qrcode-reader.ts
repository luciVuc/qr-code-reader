import QrCode from 'qrcode-reader';

const DEFAULT_ASPECT_RATIO = 16 / 9;
const qrCode = new QrCode();

export const decode = (imageData: ImageData) => {
  return new Promise((resolve, reject) => {
    qrCode.callback = (error: Error, result: any) => {
      if (error) {
        reject({ error });
      } else {
        resolve(result);
      }
    };
    qrCode.decode(imageData);
  });
};

const getVideo = async (aspectRatio: number = DEFAULT_ASPECT_RATIO) => {
  if (!navigator.mediaDevices) {
    return Promise.reject({
      error: "MediaDevices not supported. Try uploading the QR Code as an image file."
    });
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      aspectRatio,
      facingMode: 'environment'
    }
  });
  const video = document.createElement('video');
  video.srcObject = stream;
  video.play();
  return video;
};

export const readQRCodeFromCamera = async (canvas: HTMLCanvasElement, aspectRatio: number = DEFAULT_ASPECT_RATIO): Promise<IQRCodeReaderData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const video = await getVideo(aspectRatio);
      video.onloadeddata = () => {
        const ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
        // Define a function to draw the video frame to the canvas
        const drawFrame = async () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const result = await decode(imageData).catch((error) => {
            return error;
          }) as IQRCodeReaderData;
          if (result?.result) {
            resolve({ ...result, imageData } as IQRCodeReaderData);
          } else {
            requestAnimationFrame(drawFrame);
          }
        };

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Start drawing frames
        requestAnimationFrame(drawFrame);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const readQRCodeFromImage = async (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const result = await decode(imageData).catch((error) => {
    return error;
  }) as object;
  return { ...result, imageData } as IQRCodeReaderData;
};

export const qrCodeReader = { decode, readQRCodeFromCamera, readQRCodeFromImage };
export default qrCodeReader;