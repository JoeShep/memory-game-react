https://www.codicode.com/art/3d_flipping_cards_pure_css3_card_flip_plugin.aspx

<div class="flipcard h">
    <div class="front">
      This is the front side
    </div>
    <div class="back">
	  This is the back side
    </div>
</div>


.flipcard {
  position: relative;
  width: 220px;
  height: 160px;
  perspective: 500px;
}
.flipcard.v:hover .front, .flipcard.v.flip .front{
  transform: rotateX(180deg);
}
.flipcard.v:hover .back, .flipcard.v.flip .back{
  transform: rotateX(0deg);
}
.flipcard.v .back{
  transform: rotateX(-180deg);
}
.flipcard.h:hover .front, .flipcard.h.flip .front{
  transform: rotateY(180deg);
}
.flipcard.h:hover .back, .flipcard.h.flip .back{
  transform: rotateY(0deg);
}
.flipcard.h .back{
  transform: rotateY(-180deg);
}
.flipcard .front, .flipcard .back
{
  position:absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: all 0.5s ease-in;
  color: white;
  background-color: #000;
  padding: 10px;
  backface-visibility: hidden;
}

document.querySelector('#cardId').classList.toggle('flip');
// or using jQuery
// $("#cardId").toggleClass("flip");

when clicking on a tile
IF it has not been flipped
AND there are 0 or 1 tiles flipped already
  *flip it*
    IF it is the only flipped tile
      *make it impossible for user to flip it back*
      AND
      *do not add it to the array of flipped tile ids*
    IF it is the 2nd flipped tile
      *compare the two flipped tiles*
        IF they match
          *mark them as matched
        AND
          *disallow flipping them back to hidden*

2/23
Bug: Flipping two matches works and resets state.clickedTiles back to empty array.
But clicking on a new (3rd) tile flips it OK but I can't click a 2nd (4th) tile to flip it
Status: fixed

Bug: Clicking on unmatched tile sets it and 1st tile to unmatched too quickly. Need to show first, then flip after X seconds
Status: fixed

2/24
Bug: componentWillReceiveProps works great, but if user clicks board before clicking start btn, it is also triggered.
Status: fixed!

Bug: endGame state switching to endGame component causes error re: trying to update a mounted compnenet. Assume this is about componentWillReceiveProps in BoardComponent, which has just been unmounted
Status: 3/20, First steps done: Moved mgt of game state to a new Container comp. So far, clicking start properly kicks off the shuffling animation and changes the text. Tiles are clickable and 2 will flip. BUT, they don't flip back.


TODO:
Look into refactoring so many props hand-offs(downs?) by using *this.props.children*
√ Add randomization of images
√ Delay green background on match until second card has flipped completely
Add tile front CSS
Add red background when no match
Add SFX for
  match
    ding
    audio clip
  no match
  randomizing
    Make 3 at a time have class of "randomized". Set a 'randomized' state on the board(?) after the component mounts
  winning
√ Add intro/start game affordance
Add moves counter
Add modes
  timer
  X moves
Add user
  stats


