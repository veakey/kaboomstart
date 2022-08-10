
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

async function init() {
  kaboom();
  loadSprite("bean", "/sprites/bean.png")
  await loadBackground();

  gravity(2000)
  const SPEED = 320
  const BULLET_SPEED = 800
  const mouse = mousePos()

  const player = add([
    sprite("bean"),   // sprite() component makes it render as a sprite
    pos(120, 80),     // pos() component gives it position, also enables movement
    rotate(0),        // rotate() component gives it rotation
    origin("center"),
    area(),
    body(),
    // origin() component defines the pivot point (defaults to "topleft")
  ])
  // add a piece of text at position (120, 80)

  add([
    rect(width(), 0),
    outline(1),
    area(),
    pos(0, height() - 130),
    // Give objects a solid() component if you don't want other solid objects pass through
    solid(),
    color(126,200,80),
    opacity(0.0)
  ])

  onMousePress("left", () =>{
    const projectile = add([
      pos(player.pos),
      rect(5,10),
      color(RED),
      area(),
      move(player.pos.sub(mouse.pos), BULLET_SPEED),
      cleanup(),
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

init();
