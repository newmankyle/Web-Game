//INSTRUCTIONS: click the mouse to start. The ball bounces across the minesweeper field to uncover squares. Uncover as many non-bomb cells as you can before the timer runs out
// if you hit a mine simply press any key to retry
// Coloured sqaures will change how your ball bounces and moves. The effects are explained in the top right corner
// Good Luck.


int cols=25; //minesweeper variables
int rows=25;
int [] [] cells= new int[cols][rows];
int [] [] powerUp = new int [cols][rows];
int maxbombs=25;
int score=0;
int [] []  count= new int[cols][rows];
int sum=0;
boolean gameOver=false;
boolean [] [] checked = new boolean[cols][rows];

float a=1; ///variables for ball
float v=0;
float hor=625;
float vert=550;
boolean go=false;
boolean bounced=false;

float ballX=0; // variables for the following ball
float ballY=0;
float easing=0.02;
float bWidth=15;
float bHeight=15;

boolean powerOne=false; //booleans for when powerups are activated
boolean powerTwo=false;
boolean powerThree=false;

float time=8000;


void setup() {
  size (750, 750);



  for (int j=1; j<cells.length-1; j=j+1) {
    //Randomly spawns 25 bombs on the field
    for (int k=1; k<cells.length-1; k=k+1) {

      cells[j][k]=int(random(1000));
      powerUp[j][k]=int(random(500));
      if (cells[j][k]>=850) { ///Randomly assigns bomb and benign cells
        cells[j][k]=1;
        sum+=cells[j][k];
      }
      else {
        cells[j][k]=0;
      }



      if (powerUp[j][k]>495) {///also spawns the powerups and their values
        powerUp[j][k]=3;
      }
      else if (powerUp[j][k]>400 && powerUp[j][k]<415) {
        powerUp[j][k]=2;
      }
      else if (powerUp[j][k]>300 && powerUp[j][k]<310) {
        powerUp[j][k]=1;
      }
    }
  }
  sum=529-sum; //This keeps track of how many non-bombs are in the 23x23 grid
}






void draw() {
  background (200);
  float targetX = mouseX;
  float targetY = mouseY;

  ballX += (targetX - ballX) * easing; //Easing system so that the ball does not follow the mouse exactly
  ballY+= (targetY-ballY) * easing;
  int x=int(ballX)/20; //Instead of the x and y values being tracked by the mouse, it is tracked by whatever cell the ball is over at bounce time
  int y=int(ballY)/20;
  if (ballX>500) {
    ballX=500;
  }
  if (ballY>500) {
    ballY=500;
  }

  fill (0);
  textSize (15);
  text (x, 700, 700);
  text (y, 700, 715);
  text (sum, 700, 140);
  textSize (30);
  text (score, 700, 100);
  textSize(15);
  if (gameOver) {
    textSize (13);
    text ("Game Over... Press any Key to try again.", 513, 200);
  }
  if (!gameOver) {
    time-=1;
    text (time, 525, 200);
    if (time==0) {gameOver=true;}
  }
  for (int j=0; j<520; j+=20) {
    line(1, j, 500, j); //Spawns the grid for the minesweeper
    line(j, 1, j, 500);
  }
  line(500, 400, 500, 750);//spawns the second window
  line(500, 400, 750, 400);

  for (int j=1; j<cells.length-1; j++) {

    for (int k=1; k<cells.length-1; k++) {


      if (powerUp[j][k]==3) { /////Powerup 3 makes the ball move much slower

        fill (255, 0, 0);
        rect(j*20, k*20, 19, 19);
      }

      else if (powerUp[j][k]==2) { ///Powerup 2 heightens the balls bounce

        fill (0, 255, 0);
        rect(j*20, k*20, 19, 19);
      }

      else if (powerUp[j][k]==1) {//Powerup 1 makes the ball bounce slower

        fill (0, 0, 255);
        rect(j*20, k*20, 19, 19);
      }
    }
  }
  if (mousePressed) {
    go=true;
  }
  if (go && !gameOver) { //ball bouncing code

    v+=a;
    vert+=v ;
    bWidth -=0.1; //the width of the mouse-following ball corresponds to the bouncing ball
    bHeight -=0.1;

    if (vert>=750) { //rebound code
      v=-1*v;
      vert=749;
      bounced=true;

      if (powerOne) { //when powers are activated, certain changes happen to both balls
        textSize(50);
        fill(0);

        a=0.5; //Higher Bounce
        easing=0.02;
        bWidth=18;
        bHeight=18 ;
      }
      else if (powerTwo) {
        a=2;

        easing=0.02; //Lower Bounce
        bWidth=13;
        bHeight=13 ;
      }
      else if (powerThree) {
        a=1; //Slower ball
        easing=0.005;
        bWidth=15;
        bHeight=15;
      }
      else {
        a=1;
        bWidth=15;
        bHeight=15;
      }
    }
    if (vert<0) {
      v=-1*v;
      vert=1;
    }
  }
  fill(255);
  ellipse(hor, vert, 50, 50);

  if (powerOne) { //Text explains what effect the powerups have
    textSize(35);
    fill(0);
    text ("Higher Bounce", 500, 27);
  }
  else if (powerTwo) {
    textSize(35);
    fill(0);
    text ("Low Bounce!", 500, 27);
  }
  else if (powerThree) {
    textSize(35);
    fill(0);
    text ("Slower Ball", 500, 27);
  }



  if (bounced) { //checking the cell when ever the ball hits the ground.
    bounced=false;

    if (x>0 && x<24 && y<24 && y>0 ) { ///LEFT SIDE  AND BOTTOM HAS NO BOMBS
      if (!checked[x][y] && cells[x][y]==0) {
        score+=1;
      }
      checked[x][y]=true;


      if (cells[x][y]==0) {
        count[x][y]= cells[x-1][y-1] + cells[x][y-1] + cells[x+1][y-1] + cells[x-1][y] + cells[x+1][y] + cells[x-1][y+1] + cells[x][y+1] + cells[x+1][y+1];

        if (powerUp[x][y]==1) { //if the ball stumbles upon a powerup, that powerup takes effect.
          powerOne=true;
          powerTwo=false;
          powerThree=false;
        }
        if (powerUp[x][y]==2) {
          powerOne=false;
          powerTwo=true;
          powerThree=false;
        }
        if (powerUp[x][y]==3) {
          powerOne=false;
          powerTwo=false;
          powerThree=true;
        }

        if (count[x][y]==0) { 

          //CHECK ALL ADJACENT CELLS SEPARATELY IN RECURSION FUNCTION
          findMine(x-1, y-1);
          findMine(x, y-1);
          findMine(x+1, y-1);
          findMine(x-1, y);
          findMine(x+1, y);
          findMine(x-1, y+1);
          findMine(x, y+1);
          findMine(x+1, y+1);
        }
      }
      if (cells[x][y]==1) { //if the ball hits a mine
        //GAME OVER MAN
        gameOver=true;
      }
    }
  }



  for (int j=1; j<cells.length-1; j=j+1) {//Draws all cells when clicked and not clicked

    for (int k=1; k<cells.length-1; k=k+1) {

      if (count[j][k]==0 && checked[j][k]) { //uncovered cells with no adjacent bombs
        fill(200);
        rect(j*20, k*20, 20, 20);
      }
      if (count[j][k]>0 && checked[j][k]) { //adjacent bombs
        //fill (200);
        //rect(j*20,k*20, 20,20);
        fill(200, 10, 10);

        textSize(25);
        text(count[j][k], j*20, k*20+20);
      }
      if (!checked[j][k]) { //all cells that haven't been uncovered
        fill (220);
        rect (j*20, k*20, 20, 20);
      }
      if (cells[j][k]==1 && checked[j][k]) { //Uncovered bombs
        fill (100);
        rect(j*20, k*20, 19, 19);
      }
    }
  }
  if (!gameOver) {
    fill(255);
    ellipse(ballX, ballY, bWidth, bHeight); //the mouse-following ball
  }
  if (gameOver && keyPressed) {
    Reset(x,y); //resetting function. Just press any key to continue
  }
}

void findMine(int x, int y) {//RECURSION FUNCTION  //NO IDEA HOW TO DECLARE THIS FUNCTION...


  if (x>0 && x<cells.length-1 && y<cells.length-1 && y>0 ) { ///LEFT SIDE  AND BOTTOM HAS NO BOMBS

    if (cells[x][y]==0) {
      //runs the same checking program.
      if (!checked[x][y]) { //I've added a boolean array to keep track of which cells i've checked. Otherwise I'm assuming the function would just loop infinitely.

        count[x][y]= cells[x-1][y-1] + cells[x][y-1] + cells[x+1][y-1] + cells[x-1][y] + cells[x+1][y] + cells[x-1][y+1] + cells[x][y+1] + cells[x+1][y+1];

        checked[x][y]=true;
        score+=1;
        if (count[x][y]==0) {//if this particular cell is also empty of adjacent bombs, the function checks ALL ITS adjacent cells.
          findMine(x-1, y-1);
          findMine(x, y-1);
          findMine(x+1, y-1);
          findMine(x-1, y);
          findMine(x+1, y);
          findMine(x-1, y+1);
          findMine(x, y+1);
          findMine(x+1, y+1);
        }
      }
    }
  }
}

void Reset(int x, int y) {
  gameOver=false;
  score=0;
  time=8000;
  powerOne=false;
  powerTwo=false;
  powerThree=false;
  sum=0;

  for (int j=1; j<cells.length-1; j=j+1) {
    //Randomly spawns 25 bombs on the field
    for (int k=1; k<cells.length-1; k=k+1) {
      checked[j][k]=false;
      cells[j][k]=int(random(1000));
      powerUp[j][k]=int(random(500));
      if (cells[j][k]>=850) { ///Randomly assigns bomb and benign cells
        cells[j][k]=1;
        sum+=cells[j][k];
      }
      else {
        cells[j][k]=0;
      }



      if (powerUp[j][k]>495) {///also spawns the powerups and their values
        powerUp[j][k]=3;
      }
      else if (powerUp[j][k]>400 && powerUp[j][k]<415) {
        powerUp[j][k]=2;
      }
      else if (powerUp[j][k]>300 && powerUp[j][k]<310) {
        powerUp[j][k]=1;
      }
    }
  }
  sum=529-sum; //This keeps track of how many non-bombs are in the 23x23 grid
}






