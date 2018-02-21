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
