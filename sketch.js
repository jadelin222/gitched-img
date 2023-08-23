//title and what I want to achieve:
//the title of this is _Glitched Marriage, Glitched Woman_.
//I aim to achieve a glitchy effect and apply different techniques of glitch in this project. There are 3 images used in this project, all of which are drawn from the same screenshot of a found wedding footage. I used photoshop to separate the background and the bride, resulting in 2 images. and for img3, I use text editing to glitch the orginal screenshot, which is the OG way of glitching an image.
//I first created a funtion to distord the background, I also use array to draw sections of glitched image and bride image on top of the canvas, aiming to disrupt the original image. And user can press A to draw new sections of images. and I use pixel sorting with for loop and if statement to find the redder pixels and replace them with random color dots, so the effect looks like TV noise. tint() and blendMode() are also used in this project. For more detail please see the code below.

//story behind the original image and why I chose it:
//It is a screenshot from found footages of Chinese weddings dated about 10 years ago. I bought these DV tapes when they were sold as trash and found these meaningful footages inside the tapes. The image itself is already symmetrical, when adding different elements on top of the image they break the symmetry but the harmony of a symmetrical image remains at the same time. The bride looks like she's looking into a mirror, and we can see the confusion and happiness showing on her face at the same time.
//marriage to me is a confusing thing, I fear marriage as much as I see my parents' marriage and how my mom is always unhappy. I realized when I was really young, that marriage is a cage for women, women tend to gradually lost themselves in this relationship. Upon entering a marriage, a womon's identity is downgraded to just a wife and a mother (if they have children). Once bonded by the idea of family, they can never escape. So I use glitch to address my idea, as the bride's face break and disruppted by different shapes, her image become unrecognizable, while she still keeps the position of "looking into the mirror", as if she is trying to look for herself in marriage. I believe Glitch is a good tool to express the idea of lost identity, as it disrupts the image just like women's identity is distrupted in marriage.

//inspirations
//I take inspirations from Thomas Sauvin's Beijing Silvermine project and Kensuke Koike.
//Both Sauvin and Kensuke Koike work closely with found images, and use them on different creative projects. A common way is through collage. I apperaciate this approach as they bring a second life to thses photos, and the memories behind these photos might once be a treasure to someone.
//Kensuke Koike's collage is delicate and playful, he uses traditional print media but the use of replacing image, cropping, and element selection can also be studied from a computing perspective.
//Sauvin has salvaged discarded negatives from a recycling plant in rural Beijing, negatives that were destined to destruction, he organized and utilized these negatives and make them into book, documentaries and collages. Sauvin's project is especially meaningful as he preserves and provides us a scope to glimpse the Chinese life after economic reform which brings people access to cameras. The footages I have is a glimpse into Chinese wedding culture with the popularization of DV technologies.

//links
//https://www.beijingsilvermine.com/gallery
//https://www.instagram.com/kensukekoike/?hl=en
//for image reference, because I made/own these images, so I attached the original version of the image inside the img file.

var img;
var img2;
var img3;

function preload() {
  img = loadImage("img/2b.png"); //background image
  img2 = loadImage("img/2.png"); //bride image
  img3 = loadImage("img/2d.jpg"); //glitched image
}

function setup() {
  createCanvas(img.width, img.height);
  angleMode(DEGREES); //take degrees in shearX, shearY and rotate
}

function draw() {
  imageMode(CENTER); //take the parameters as the center of the image.
  section(img, 0, 0, width); //function to draw and distord the background image
  noLoop(); //run only once
  image(img2, img.width / 2, img.height / 2); //draw the bride image.

  imageMode(CORNER); //change back to default image mode
  push();
  blendMode(MULTIPLY); //multiply can make the area darker
  tint(255, 0, 0); //tint the draw area with red color
  image(img2, 371, 140, 242, 100, 371, 140, 242, 100);

  blendMode(OVERLAY); //Multiplies dark values, and screens light values
  image(img2, 200, 95, 60, 60, 200, 95, 60, 60);
  image(img2, 157, 280, 52, 280, 157, 280, 52, 280); //redraw 3 sections of image 2 on top of itself with a red tint

  pop(); //push and pop to make the tint only happen within these 2 commands.

  getRed(); //draw TV noise like effect over redder pixels.

  for (var i = 0; i < width + width / 6; i += width / 6) {
    for (var j = 0; j < height + height / 6; j += height / 6) {
      if (random() > 0.4) {
        //60%chance it will draw a selction from img3(glitched image)

        image(img3, i, j, 60, 40, i, j, 60, 40); //draw boxs selected from img3(glitch image) on top of the canvas
      }
    }
  }

  for (var i = 0; i < width + width / 20; i += width / 20) {
    for (var j = 0; j < height + height / 16; j += height / 16) {
      image(img2, i, j, 20, 20, i, j, 20, 20); //draw boxs selected from img2(bride image) on top of the canvas
    }
  }
}

//function keyPressed(){
function mousePressed() {
  // if(key == 'a' || key == 'A'){
  for (var f = 10; f > 0; f--) {
    //when A is pressed, draw 10 of the image selection on screen.

    imageMode(CENTER); //the the parameters as the center of the image, if use default corner mode the drawn image section will overlap with original image, using center mode can offset the image by a little.
    //comment above line to see a different effect
    drawRandomImageSection(
      img2,
      random(258, 643),
      random(171, 291),
      random(90, 150),
      random(60, 90)
    );

    imageMode(CORNER); //draw image from topleft corner
    drawRandomImageSection(
      img3,
      random(440, 826),
      random(23, 328),
      random(70, 40),
      random(120, 460)
    );
  }
  //  }
}

function getRed() {
  loadPixels();
  const d = pixelDensity();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = 4 * d * (y * d * width + x); //sorting pixels by row
      const [r, g, b] = [pixels[index], pixels[index + 1], pixels[index + 2]]; // get colors by 3 indexes

      if (r > 200 && g < 150 && b < 120) {
        // condition to find color with r value >200 (finding redder pixels)
        noStroke();
        fill(random(0, 255), random(0, 255), random(0, 255), 50); //generate random color
        ellipse(x, y, random(1, 5)); //draw ellipse of random color with random sizes over the detected pixels.
      }
    }
  }
}

function section(img, x, y, w) {
  var num = random(1, 6);
  var wid = w / num; //wid is width of image after being sectioned, draw random number so the size varies, w is the size of the input image
  for (var row = x; row < x + w - 1; row += wid) {
    for (var col = y; col < y + w - 1; col += wid) {
      //2 loops sorting grids by rows and columns. +=wid so the next image drawn will not overlap.
      if (w > width / 4) {
        section(img, row, col, wid);
        //if w is too big, run section function again to reduce its size
      } else {
        var imgsection = img.get(row, col, wid, wid); //get an area from the original img
        image(imgsection, row + wid / 2, col + wid / 2); //draw the sectioned images on top of each cell
        for (var i = wid; i > 0; i--) {
          push();
          translate(row + wid / 2, col + wid / 2); //lay out each sectioned image to the right position so that they dont overlap
          shearX(random(-30, 30));
          shearY(random(-30, 30));
          scale(random(0.8, 1.2));
          rotate(random(0, 90)); //commands to distord the sectioned image by shear/scale/rotate
          image(imgsection, 0, 0, i, i); //draw the rotated and scaled images on top of sectioned images
          pop(); //stop the drawig process
        }
      }
    }
  }
}

function drawRandomImageSection(img, posx, posy, wid, hei) {
  image(img, posx, posy, wid, hei, posx, posy, wid, hei); //select one area of an image and draw it at the same area with the same size on the canvas
}
