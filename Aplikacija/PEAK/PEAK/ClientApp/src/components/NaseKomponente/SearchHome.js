import React from "react";
import baner1 from './images/banner1.jpg'

function SearchHome(props){

    return (
        <div>
            <section class="w3l-main-slider" id="home">
          <div className="banner-content">
              <div id="demo-1"
                //   data-zs-src='["images/banner1.jpg", "images/banner2.jpg","images/banner3.jpg", "images/banner4.jpg"]'
                  data-zs-src={baner1}
                   data-zs-overlay="dots">
                  <div className="demo-inner-content">
                      <div className="container">
                          <div className="banner-infhny">
                              <h3>Dobrodosli na nas sajt</h3>
                              <h6 className="mb-3">Ovaj sajt je vezan za planinarenje</h6>
                              <div className="flex-wrap search-wthree-field mt-md-5 mt-4">
                                  <form action="#" method="post" className="booking-form">
                                      <div className="row book-form">
                                          <div className="form-input col-md-4 mt-md-0 mt-3">

                                              <select name="selectpicker" className="selectpicker">
                                                  <option value="">Suva planina</option>
                                                  <option value="staraPlanina">Stara planina</option>
                                                  <option value="rtanj">Rtanj</option>
                                                  <option value="alpi">Alpi</option>
                                                  <option value="himalaji">Himalaji</option>
                                                  <option value="prokletije">Prokletije</option>
                                                  <option value="stolovi">Stolovi</option>
                                              </select>

                                          </div>
                                          <div className="form-input col-md-4 mt-md-0 mt-3">

                                              <input type="date" name="" placeholder="Date" required="" />
                                          </div>
                                          <div className="bottom-btn col-md-4 mt-md-0 mt-3">
                                              <button className="btn btn-style btn-secondary">
                                                  <span className="fa fa-search mr-3"
                                                        aria-hidden="true"></span> Search
                                              </button>
                                              {/* <img src={baner1} /> */}
                                          </div>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
        </div>
    );
}

export default SearchHome;