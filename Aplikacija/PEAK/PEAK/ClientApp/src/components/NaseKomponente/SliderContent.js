import React from "react";

function SliderContent({activeIndex, imageSlider}){
    return (
        <section>
                {imageSlider.map((slide,index) => (
                    <div
                        key={index}
                        className={index===activeIndex ? "slides active":"inactive"}
                    >
                        <img className="slide-image" src={slide.image} alt="" />
                        <h2 className="slide-title">{slide.data}</h2>
                    </div>
                ))}
        </section>
    )
}

export default SliderContent;