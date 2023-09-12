const str = "asd.gif";

const cardHaveUploadedImage = (str) => {
  const imageStringLength = String(str).length;
  const format = str.split(".")[imageStringLength - 1];
  return ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"].includes(
    format
  );
};

cardHaveUploadedImage(str);
