let SPEED, BULLET_SPEED,
    player, enemy;

async function loadBackground() {
  const bgImage = await loadSprite("background", "img/background.jpg");

  const background = add([
    sprite("background"),
    // Make the background centered on the screen
    pos(width() / 2, height() / 2),
    origin("center"),
    // Allow the background to be scaled
    scale(4),
    // Keep the background position fixed even when the camera moves
    fixed()
  ]);
  // Scale the background to cover the screen
  background.scaleTo(Math.max(
    width() / bgImage.tex.width,
    height() / bgImage.tex.height
  ));
}

function initializeValues() {
  gravity(2000);
  SPEED = 500;
  BULLET_SPEED = 800;
}

function loadSprites() {
    loadSprite("bean", "sprites/maincharacter.png");
    loadSpriteAtlas("sprites/super-sayan.png", {
        "enemy": {
            // location of where to find the target sprites
            "x": 0,
            "y": 0,
            "width": 738,
            "height": 187,
            "sliceX": 6,
            "anims": {
                "idle": {
                    "from": 0,
                    "to": 5,
                    "speed": 6,
                    "loop": true
                }
            }
        }
      })
}

function addElements() {
  player = add([
    sprite("bean"),   // sprite() component makes it render as a sprite
    pos(120, 80),     // pos() component gives it position, also enables movement
    rotate(0),        // rotate() component gives it rotation
    origin("center"),
    area(),
    body()
  ])

  enemy = add([
      sprite("enemy", {anim: "idle"}),   // sprite() component makes it render as a sprite
      pos(width()-120, 80),     // this should be random position inside screen
      rotate(0),        // rotate() component gives it rotation
      origin("center"),
      area(),
      body(),
      state("move", [ "idle", "move" ])
    ])

  add([
    rect(width(), 0),
    outline(1),
    area(),
    pos(0, height() - 130),
    // Give objects a solid() component if you don't want other solid objects pass through
    solid(),
    color(126,200,80),
    opacity(0.0)
  ]);
}

function setUpCallbacks() {
    onMousePress("left", () => {
        const dir = mousePos().sub(player.pos).unit();
        add([
          move(dir, BULLET_SPEED),
          pos(player.pos),
          rect(9, 6),
          area(),
          cleanup(),
          origin("center"),
          color(RED),
          "bullet"
        ])
  })


  // .onUpdate() is a method on all game objects, it registers an event that runs every frame
  onKeyDown("a", () => {
    // .move() is provided by pos() component, move by pixels per second
    player.move(-SPEED, 0)
  })

  onKeyDown("d", () => {
    player.move(SPEED, 0)
  })

  onKeyDown("w", () => {
    player.move(0, -SPEED)
  })

  onKeyDown("s", () => {
    player.move(0, SPEED)
  })

  onKeyPress("w", () => {
    // .isGrounded() is provided by body()
    if (player.isGrounded()) {
      // .jump() is provided by body()
      player.jump()
    }
  })

  // Add multiple game objects
  onKeyPress("f", () => {
    fullscreen(!fullscreen())
  })
}

async function init() {
  kaboom();
  initializeValues();
  await loadBackground();
  loadSprites();
  addElements();
  setUpCallbacks();
}

init();