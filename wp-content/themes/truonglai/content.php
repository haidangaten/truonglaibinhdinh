<div id="hero-area" class="hero-slider-area">
    <div id="htmlcaption1">
        <div class="slide-table container">
            <div class="table-cell">
                <div class="hero-slide-content float-right text-left">
                    <?php 
								echo do_shortcode('[smartslider3 slider=4]');
								?>
                </div>
            </div>
        </div>
    </div>
</div>



<!--============================================ -->
<div id="feature-area" class="feature-area bg-gray pt-90 pb-90">
    <div class="container">
        <!-- Section Title -->
        <div class="row">
            <div class="section-title text-center col-xs-12 mb-45">
                <h3 class="heading">Đặc trưng dịch vụ</h3>
                <div class="excerpt">
                    <p>Những đặc trưng dịch vụ tạo nên sự khác biệt chất lượng giảng dạy</p>
                </div>
                <i class="icofont icofont-traffic-light"></i>
            </div>
        </div>
        <div class="row">
            <!-- Left Feature -->
            <div class="feature-wrapper feature-left text-right col-md-4 col-xs-12">
                <div class="single-feature">
                    <div class="icon"><i class="icofont icofont-file-spreadsheet"></i></div>
                    <div class="text fix">
                        <h4>Chất lượng</h4>
                        <p>Tự hào là trung tâm có tỷ lệ học viên đậu cao nhất Bình Định</p>
                    </div>
                </div>
                <div class="single-feature">
                    <div class="icon"><i class="icofont icofont-car-alt-4"></i></div>
                    <div class="text fix">
                        <h4>Đa dạng</h4>
                        <p>Đào tạo đầy đủ các hạng xe như A1, A2, B1 (AT), B2, C</p>
                    </div>
                </div>
                <div class="single-feature">
                    <div class="icon"><i class="icofont icofont-video-alt"></i></div>
                    <div class="text fix">
                        <h4>Hiện đại</h4>
                        <p>Phương pháp giảng dạy hiện đại, gần gũi, dễ hiểu</p>
                    </div>
                </div>
            </div>
            <!-- Feature Image -->
            <div class="feature-image text-center col-md-4 col-xs-12">
                <img src="<?php bloginfo('template_directory')?>/img/feature.png" alt="feature" />
            </div>
            <!-- Right Feature -->
            <div class="feature-wrapper feature-right text-left col-md-4 col-xs-12">
                <div class="single-feature">
                    <div class="icon"><i class="icofont icofont-man-in-glasses"></i></div>
                    <div class="text fix">
                        <h4>Nhiệt tình</h4>
                        <p>Đội ngũ giáo viên đông đảo, giàu kinh nghiệm, nhiệt tình</p>
                    </div>
                </div>
                <div class="single-feature">
                    <div class="icon"><i class="icofont icofont-clock-time"></i></div>
                    <div class="text fix">
                        <h4>Uyển chuyển</h4>
                        <p>Học viên tự chọn ngày giờ học, đặt quyền lợi của học viên lên đầu</p>
                    </div>
                </div>
                <div class="single-feature">
                    <div class="icon"><i class="icofont icofont-direction-sign"></i></div>
                    <div class="text fix">
                        <h4>Thực hành</h4>
                        <p>Thời gian thực hành trên xe nhiều</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Funfact Area
============================================ -->
<div class="funfact-area overlay overlay-white overlay-80 pt-90 pb-60">
    <div class="container">
        <div class="row">
            <div class="single-facts text-center col-sm-3 col-xs-12 mb-30">
                <i class="icofont icofont-hat-alt"></i>
                <h1 class="counter">10700</h1>
                <p>Số học viên tốt nghiệp</p>
            </div>
            <div class="single-facts text-center col-sm-3 col-xs-12 mb-30">
                <i class="icofont icofont-user-suited"></i>
                <h1 class="counter">100</h1>
                <p>Số lượng giáo viên</p>
            </div>
            <div class="single-facts text-center col-sm-3 col-xs-12 mb-30">
                <i class="icofont icofont-history"></i>
                <h1 class="counter">100</h1>
                <p>Tổng số xe</p>
            </div>
            <div class="single-facts text-center col-sm-3 col-xs-12 mb-30">
                <i class="icofont icofont-users-social"></i>
                <h1 class="counter">90</h1>
                <p>Số khóa học đã mở</p>
            </div>
        </div>
    </div>
</div>
<!-- Course Area
============================================ -->
<!-- Gallery Area
============================================ -->
<div id="gallery-area" class="gallery-area bg-gray pt-90 pb-60">
    <div class="container">
        <!-- Section Title -->
        <div class="row">
            <div class="section-title text-center col-xs-12 mb-45">
                <h3 class="heading">thư viện hình ảnh</h3>
                <div class="excerpt">
                    <p>Thư viện hình ảnh đào tạo của trung tâm</p>
                </div>
                <i class="icofont icofont-traffic-light"></i>
            </div>
        </div>
        <!-- Gallery Grid -->
        <div class="gallery-grid row">
            <?php echo do_shortcode('	[aigpl-gallery id="120"]')?>
        </div>
    </div>
</div>
<!-- Testimonial Area -Hiển thị đánh giá
============================================ -->
<div id="testimonial-area" class="testimonial-area overlay overlay-white overlay-80 text-center pt-90 pb-90">
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 col-xs-12">
                <!-- Testimonial Image Slider -->
                <div class="ti-slider mb-40">

                </div>
                <!-- Testimonial Content Slider -->
                <div class="tc-slider">
                    <div class="single-slide">
                        <?php echo do_shortcode('[testimonial_view id="1"] '); ?>
                    </div>
                    <div class="single-slide">
                        <?php echo do_shortcode('[testimonial_view id="2"] '); ?>
                    </div>
                    <div class="single-slide">
                        <?php echo do_shortcode('[testimonial_view id="3"] '); ?>
                    </div>
                    <div class="single-slide">
                        <?php echo do_shortcode('[testimonial_view id="4"] '); ?>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- Slider Arrows -->
    <button class="ts-arrows ts-prev"><i class="icofont icofont-caret-left"></i></button>
    <button class="ts-arrows ts-next"><i class="icofont icofont-caret-right"></i></button>
</div>
<!-- Instructor Area
============================================ -->
<!-- Pricing Area
============================================ -->
<!-- FAQ Area
============================================ -->
<div id="faq-area" class="faq-area bg-white pt-90 pb-60">
    <div class="container">
        <!-- Section Title -->
        <div class="row">
            <div class="section-title text-center col-xs-12 mb-45">
                <h3 class="heading">Câu hỏi thường gặp</h3>
                <div class="excerpt">
                    <p>Bạn còn lưỡng lự, chưa rõ thông tin? Hãy xem thêm các thông tin bên dưới</p>
                </div>
                <i class="icofont icofont-traffic-light"></i>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="panel-group" id="faq">
                    <div class="panel panel-default">
                        <?php echo do_shortcode('[select-faq faq_id="190"]'); ?>
                    </div>
                    <div class="panel panel-default">
                        <?php echo do_shortcode('[select-faq faq_id="191"]'); ?>
                    </div>
                    <div class="panel panel-default">
                        <?php echo do_shortcode('[select-faq faq_id="192"]'); ?>
                    </div>
                    <div class="panel panel-default">
                        <?php echo do_shortcode('[select-faq faq_id="194"]'); ?>
                    </div>
                </div>
            </div>
            <div class="faq-image col-md-6">
                <img src="<?php bloginfo('template_directory')?>/img/faq.png" alt="" />
            </div>
        </div>
    </div>
</div>
</div>