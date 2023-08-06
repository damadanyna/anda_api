const fs = require('fs');
const path = require('path');

function generateRandomNumberWithStep(min, max, step) {
  const range = (max - min) / step;
  const randomStep = Math.floor(Math.random() * (range + 1));
  const randomNumber = min + randomStep * step;
  return randomNumber;
}


function generateFourn(label,path, name_){
  const min = 3000;
  const max = 1000000;
  const step = 500;
  var label_=cutString(30,label);
  
  const randomNumber = generateRandomNumberWithStep(min, max, step);
  return { 
            prod_label: label_,
            cat_id:1,
            sous_cat_id:1,
            prod_description:'Description du prodiut '+label_,
            prod_prix:randomNumber,
            prod_disp: 1,
            prod_parh:path,
            prod_fileName:name_
        }
}

function cutString(taille,txt){
  return txt.length<30?txt:txt.substring(0,27)+'...'
}

function listImages(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

        const imageFiles = files.filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return imageExtensions.includes(ext);
        });

        const imagesData = imageFiles.map((image) => {

          const imageNameWithoutExt = path.basename(image, path.extname(image));
          var data=generateFourn(imageNameWithoutExt,path.resolve(folderPath, image),image)

          return {
            data
          };
        });

        resolve(imagesData);
      }
    });
  });
}

module.exports = listImages;
