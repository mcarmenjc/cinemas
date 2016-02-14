"use strict";

let OdeonScheduleController = require('../controllers/odeon-schedule-controller.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	cheerio = require('cheerio'),
	request = require('request'),
	expect = chai.expect;

describe('OdeonScheduleController', function(){
	var odeonPageBody = '<section id="ind-film-list-WEEK">' + 
'    <div id="28683" class="film-detail WEEK">' + 
'        <div class="content-container film _WEEK" id="film-28683">' + 
'            <div class="grad-hor">' + 
'                <a href="/films/america_wild_national_parks_adventure/16483/"><img alt="America Wild: National Parks Adventure" src="http://m2.odeon.co.uk/_uploads/asset_management/70x108_b698588e4b5921db5912a67dd9a5070e.jpg"></a>' + 
'                <div class="presentation-info">' + 
'                    <h4><a href="/films/america_wild_national_parks_adventure/16483/">America Wild: National Parks Adventure</a></h4>' + 
'                    <a href="/film-classifications/" role="link" aria-label="TBC" title="More about film classifications">' + 
'                        <div class="cert-icon-uk-TBC-small"></div>' + 
'                    </a>' + 
'                    <span class="description"></span>' + 
'                </div>' + 
'                <p>Explore the wilds of America in this giant new adventure.</p>' + 
'                <div class="presentation-info">' + 
'                    <div data-rating-master-id="16483" data-return-to="/cinemas/bfi_imax/211/" class="buzz-rating-container buzz-rating rating-icon-buzz-light-small-inactive">' + 
'                        <div class="rating-icon-buzz-small-active s0" data-rating="0">' + 
'                            <div class="rate-over s1"></div>' + 
'                            <div class="rate-over s2"></div>' + 
'                            <div class="rate-over s3"></div>' + 
'                            <div class="rate-over s4"></div>' + 
'                            <div class="rate-over s5"></div>' + 
'                        </div>' + 
'                        <i class="rating-icon-buzz-small-icon"></i>' + 
'                    </div>' + 
'                    <span class="description"><strong>Film length: 45 mins</strong></span>' + 
'                </div>' + 
'                <p class="description"></p>' + 
'            </div>' + 
'            <div class="info-corner">' + 
'                <div class="img-bundle">' + 
'                    <div class="film-icon-WEEK feature-icon-light-imax-medium WEEK_IMAX" data-schedule="IMAX" data-film="28683"></div>        ' + 
'                </div>' + 
'            </div>' + 
'        </div>' + 
'        <div id="performances-WEEK-28683" class="content-container times-all _WEEK">' + 
'            <div class="accordion-group times-all performances-WEEK _28683" id="tech-28683-0">' + 
'                <div class="content-container tech accordion-heading _WEEK">' + 
'                    <a data-toggle="collapse" data-parent="#tech-28683-0-WEEK" class="accordion-toggle" href="#collapse-28683-0-WEEK">in IMAX</a><a href="#" class="icon-info-blue info-icon-form-info-small" data-trigger="focus" tabindex="3985" data-toggle="popover" title="" data-placement="bottom" data-content="Stunning image quality, extraordinary sound and big screen experience. IMAX is believing." data-original-title=""></a>' + 
'                </div>' + 
'                <div id="collapse-28683-0-WEEK" class="accordion-body in collapse" style="height: auto;">' + 
'                    <div class="accordion-inner">' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Friday</strong><br>12 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_TBC WEEK_MORNING WEEK_IMAX  WEEK_GENRE_6 show"><a href="https://www.odeon.co.uk/booking/init/QThDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNjQ4Mw==/" class="performance-detail" title="Special Screening - book America Wild: National Parks Adventure on 12/02/2016 11:45" data-popup="popup" data-duration="45" data-start="11:45" data-end="12:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">11:45</a></li>         ' + 
'                            </ul>' + 
'                       </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Saturday</strong><br>13 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_TBC WEEK_MORNING WEEK_IMAX  WEEK_GENRE_6 show"><a href="https://www.odeon.co.uk/booking/init/QjhDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNjQ4Mw==/" class="performance-detail" title="Special Screening - book America Wild: National Parks Adventure on 13/02/2016 10:00" data-popup="popup" data-duration="45" data-start="10:00" data-end="10:45" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">10:00</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Sunday</strong><br>14 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_TBC WEEK_MORNING WEEK_IMAX  WEEK_GENRE_6 show"><a href="https://www.odeon.co.uk/booking/init/QzhDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNjQ4Mw==/" class="performance-detail" title="Special Screening - book America Wild: National Parks Adventure on 14/02/2016 10:00" data-popup="popup" data-duration="45" data-start="10:00" data-end="10:45" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">10:00</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Monday</strong><br>15 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_TBC WEEK_MORNING WEEK_IMAX  WEEK_GENRE_6 show"><a href="https://www.odeon.co.uk/booking/init/RDhDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNjQ4Mw==/" class="performance-detail" title="Special Screening - book America Wild: National Parks Adventure on 15/02/2016 10:30" data-popup="popup" data-duration="45" data-start="10:30" data-end="11:15" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">10:30</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times stopper performances-WEEK _28683"></div>' + 
'                    </div>' + 
'                </div>' + 
'            </div>' + 
'            <div class="content-container white performances-WEEK _28683"></div>' + 
'        </div>' + 
'    </div>' + 
'    <div id="27059" class="film-detail WEEK">' + 
'        <div class="content-container film _WEEK" id="film-27059">' + 
'            <div class="grad-hor">' + 
'                <a href="/films/star_wars_the_force_awakens/15866/"><img alt="Star Wars: The Force Awakens" src="http://m2.odeon.co.uk/_uploads/asset_management/70x108_8e77ea8c77e5c64af67692ce779eef68.jpg"></a>' + 
'                <div class="presentation-info">' + 
'                    <h4><a href="/films/star_wars_the_force_awakens/15866/">Star Wars: The Force Awakens</a></h4>' + 
'                    <a href="/film-classifications/" role="link" aria-label="12A" title="More about film classifications"><div class="cert-icon-uk-12A-small"></div></a>            ' + 
'                    <span class="description"></span>' + 
'                </div>' + 
'                <p>OSCAR &amp; BAFTA Nominated: We finally return to the Galaxy Far, Far Away. </p>' + 
'                <div class="presentation-info">' + 
'                    <div data-rating-master-id="15866" data-return-to="/cinemas/bfi_imax/211/" class="star-rating-container star-rating rating-icon-star-light-small-inactive">' + 
'                        <div class="rating-icon-star-small-active s9" data-rating="9">' + 
'                            <div class="rate-over s1"></div>' + 
'                            <div class="rate-over s2"></div>' + 
'                            <div class="rate-over s3"></div>' + 
'                            <div class="rate-over s4"></div>' + 
'                            <div class="rate-over s5"></div>' + 
'                        </div>' + 
'                    </div>' + 
'                    <span class="description"><strong>Film length: 135 mins</strong></span>' + 
'                </div>' + 
'                <p class="description">Moderate violence, threat</p>' + 
'            </div>' + 
'            <div class="info-corner">' + 
'                <div class="img-bundle">' + 
'                    <div class="film-icon-WEEK feature-icon-light-imax3d-medium WEEK_IMAX3D" data-schedule="IMAX3D" data-film="27059"></div>        ' + 
'                </div>' + 
'                <div class="btn-group">' + 
'                    <a href="http://odeon.trailer.cineweb.de/sw_vii.mp4" class="btn btn-primary trailer kkvideo-trigger" data-return-to="/cinemas/bfi_imax/211/" data-film-id="15866" data-showbooknowbutton="false" data-filmpage="false"><i class="film-icon-btn-play"></i>Trailer</a>' + 
'                    <button class="btn btn-primary trailer dropdown-toggle" data-toggle="dropdown">' + 
'                        <span class="caret"></span>' + 
'                    </button>' + 
'                    <ul class="dropdown-menu">' + 
'                        <li><a href="#">Add to Playlist</a></li>' + 
'                    </ul>' + 
'                </div>    ' + 
'            </div>' + 
'        </div>' + 
'        <div id="performances-WEEK-27059" class="content-container times-all _WEEK">' + 
'            <div class="accordion-group times-all performances-WEEK _27059" id="tech-27059-0">' + 
'                <div class="content-container tech accordion-heading _WEEK">' + 
'                    <a data-toggle="collapse" data-parent="#tech-27059-0-WEEK" class="accordion-toggle" href="#collapse-27059-0-WEEK">in IMAX 3D</a><a href="#" class="icon-info-blue info-icon-form-info-small" data-trigger="focus" tabindex="7733" data-toggle="popover" title="" data-placement="bottom" data-content="Stunning image quality, extraordinary sound and big screen experience. Combined with 3D, to create IMAX 3D, the ultimate film experience. IMAX 3D glasses required." data-original-title=""></a>' + 
'                </div>' + 
'                <div id="collapse-27059-0-WEEK" class="accordion-body in collapse" style="height: auto;">' + 
'                    <div class="accordion-inner">' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Wednesday</strong><br>03 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NDJDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 03/02/2016 17:45" data-popup="popup" data-duration="135" data-start="17:45" data-end="20:00" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">17:45</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NTJDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 03/02/2016 21:00" data-popup="popup" data-duration="135" data-start="21:00" data-end="23:15" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">21:00</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Thursday</strong><br>04 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NjJDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 04/02/2016 14:30" data-popup="popup" data-duration="135" data-start="14:30" data-end="16:45" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">14:30</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NzJDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 04/02/2016 17:45" data-popup="popup" data-duration="135" data-start="17:45" data-end="20:00" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">17:45</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/ODJDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 04/02/2016 21:00" data-popup="popup" data-duration="135" data-start="21:00" data-end="23:15" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">21:00</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Friday</strong><br>05 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/OTNDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 05/02/2016 17:30" data-popup="popup" data-duration="135" data-start="17:30" data-end="19:45" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">17:30</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/QTNDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 05/02/2016 20:45" data-popup="popup" data-duration="135" data-start="20:45" data-end="23:00" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">20:45</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Saturday</strong><br>06 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_MORNING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/QjNDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 06/02/2016 11:00" data-popup="popup" data-duration="135" data-start="11:00" data-end="13:15" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">11:00</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/QzNDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 06/02/2016 14:15" data-popup="popup" data-duration="135" data-start="14:15" data-end="16:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">14:15</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/RDNDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 06/02/2016 17:30" data-popup="popup" data-duration="135" data-start="17:30" data-end="19:45" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">17:30</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/RTNDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 06/02/2016 20:45" data-popup="popup" data-duration="135" data-start="20:45" data-end="23:00" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">20:45</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Sunday</strong><br>07 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/MDRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 07/02/2016 13:15" data-popup="popup" data-duration="135" data-start="13:15" data-end="15:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">13:15</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/MTRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 07/02/2016 16:45" data-popup="popup" data-duration="135" data-start="16:45" data-end="19:00" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">16:45</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/MjRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 07/02/2016 20:00" data-popup="popup" data-duration="135" data-start="20:00" data-end="22:15" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">20:00</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Monday</strong><br>08 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/MzRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 08/02/2016 14:15" data-popup="popup" data-duration="135" data-start="14:15" data-end="16:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">14:15</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NDRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 08/02/2016 17:30" data-popup="popup" data-duration="135" data-start="17:30" data-end="19:45" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">17:30</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NTRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 08/02/2016 20:45" data-popup="popup" data-duration="135" data-start="20:45" data-end="23:00" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">20:45</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Tuesday</strong><br>09 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NjRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 09/02/2016 14:15" data-popup="popup" data-duration="135" data-start="14:15" data-end="16:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">14:15</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NzRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 09/02/2016 17:30" data-popup="popup" data-duration="135" data-start="17:30" data-end="19:45" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">17:30</a></li>' +
'                            </ul>' + 
'                       </div>' + 
'                       <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Wednesday</strong><br>10 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/QTRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 10/02/2016 15:00" data-popup="popup" data-duration="135" data-start="15:00" data-end="17:15" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">15:00</a></li>' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Thursday</strong><br>11 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_AFTERNOON WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/QzRDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 11/02/2016 13:00" data-popup="popup" data-duration="135" data-start="13:00" data-end="15:15" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">13:00</a></li>' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/NzZDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 11/02/2016 18:15" data-popup="popup" data-duration="135" data-start="18:15" data-end="20:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">18:15</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Friday</strong><br>12 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/OTZDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 12/02/2016 18:15" data-popup="popup" data-duration="135" data-start="18:15" data-end="20:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">18:15</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Saturday</strong><br>13 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/QjZDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 13/02/2016 18:15" data-popup="popup" data-duration="135" data-start="18:15" data-end="20:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">18:15</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Sunday</strong><br>14 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/QzZDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 14/02/2016 18:15" data-popup="popup" data-duration="135" data-start="18:15" data-end="20:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">18:15</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times containerWEEK">' + 
'                            <div class="presentation-info week"><strong>Monday</strong><br>15 Feb</div>' + 
'                            <ul class="unstyled inline">' + 
'                                <li class="WEEK  WEEK_WHEELCHAIR performance-blue WEEK_ISPEAK WEEK_12A WEEK_EVENING WEEK_IMAX3D  WEEK_GENRE_1 WEEK_GENRE_2 WEEK_GENRE_8 show"><a href="https://www.odeon.co.uk/booking/init/RDZDMTAwMDAwMjNXWEFaTUxCIzIxMSMxNTg2Ng==/" class="performance-detail" title="Peak - book Star Wars: The Force Awakens on 15/02/2016 18:15" data-popup="popup" data-duration="135" data-start="18:15" data-end="20:30" data-status="normal" data-type="WEEK" data-auditorium-info="Screen 1 (Wheelchair Accessible)" data-is-online="1">18:15</a></li>                            ' + 
'                            </ul>' + 
'                        </div>' + 
'                        <div class="content-container times stopper performances-WEEK _27059"></div>' + 
'                    </div>' + 
'                </div>' + 
'            </div>' + 
'        <div class="content-container white performances-WEEK _27059"></div>' + 
'    </div>' + 
'</section>';

	let scheduleController;

	before(function(done){
		scheduleController = new OdeonScheduleController('BFI IMAX', 'http://www.odeon.co.uk/cinemas/bfi_imax/211/');
		sinon.stub(request, 'get')
			 .yields(null, {statusCode: 200}, odeonPageBody);
		done();
	});

	after(function(done){
    	request.get.restore();
    	done();
	});

	it('should get all films in the page', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films).to.have.length(2);
		});
	});


	it('should get film name correctly', function(){
		let expectedName = 'America Wild: National Parks Adventure';
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].name).to.equal(expectedName);
		});
	});

	it('should get all the days a film is screening', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule).to.have.length(4);
		});
	});

	it('should get film screening day correctly', function(){
		let expectedDay = 12,
			expectedMonth = 1;
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule[0].day.getDate()).to.equal(expectedDay);
			expect(cinema.films[0].schedule[0].day.getMonth()).to.equal(expectedMonth);
		});
	});

	it('should get film screening time for a day', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule[0].times).to.have.length(1);
		});
	});

	it('should get all film screening times for a day', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[1].schedule[1].times).to.have.length(3);
		});
	});

	it('should get film screening time correctly', function(){
		let	expectedTime = '11:45';
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule[0].times[0]).to.equal(expectedTime);
		});
	});
});