import { v4 as uuidv4 } from "uuid";
import slika1 from './images/sliderSlika1.jpg';
import slika2 from './images/sliderSlika2.jpg';
import slika3 from './images/sliderSlika3.jpg';
import slika4 from './images/sliderSlika5.jpg';
import slika5 from './images/sliderSlika6.png';

const dataSlider = [
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    slika: slika5
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    slika: slika2
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    slika: slika3
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    slika: slika4
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    slika: slika1
  },
];

export default dataSlider;