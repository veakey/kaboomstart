async function loadBackground() {
  const bgImage = await loadSprite("background", "img/background.jpg");

  const background = add([
    sprite("background"),
    // Make the background centered on the screen
    pos(width() / 2, height() / 2),
    origin("center"),
    // Allow the background to be scaled
    scale(1),
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

  await loadBackground();

  // add a piece of text at position (120, 80)
  add([
      text("hello"),
      pos(120, 80),
  ]);
}

init();