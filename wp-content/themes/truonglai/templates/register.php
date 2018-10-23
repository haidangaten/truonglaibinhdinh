<?php
/*
Template Name:Register
 */
?>
<?php get_header();?>
<!-- Page Banner Area
============================================ -->
<div class="page-banner-area overlay overlay-black overlay-70">
    <div class="container">
        <div class="row">
            <div class="page-banner text-center col-xs-12">
                <h1>
                    <?php single_post_title();?>
                </h1>
                <ul>
                    <li><a href="<?php echo home_url(); ?>">home</a></li>
                    <li><span>
                            <?php single_post_title()?></span></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- Contact Area
============================================ -->
<div id="contact-area" class="contact-area bg-gray">
    <div class="container pb-90 pt-90">
        <!-- Section Title -->
        <div class="row">
            <div class="section-title text-center col-xs-12 mb-45">
                <h3 class="heading">ĐĂNG KÝ GHI DANH</h3>
                <i class="icofont icofont-traffic-light"></i>
            </div>
        </div>
        <div class="row">
            <!-- Contact Info -->
            <div class="contact-info col-md-4 col-sm-5 col-xs-12">
                <div class="single-info text-left fix">
                    <div class="icon"><i class="icofont icofont-phone"></i></div>
                    <div class="content fix">
                        <h5>liên hệ</h5>
                        <p>0123456789 <br />0987456789</p>
                    </div>
                </div>
                <div class="single-info text-left fix">
                    <div class="icon"><i class="icofont icofont-envelope"></i></div>
                    <div class="content fix">
                        <h5>EMAIL</h5>
                        <p><a href="mailto:<?php echo do_shortcode('[contact type=" email_address"]')?>">
                                <?php echo do_shortcode('[contact type="email_address"]')?></a></p>
                    </div>
                </div>
                <div class="single-info text-left fix">
                    <div class="icon"><i class="icofont icofont-location-pin"></i></div>
                    <div class="content fix">
                        <h5>ĐỊA CHỈ</h5>
                        <p>
                            <?php echo do_shortcode('[contact type="location_name"]')?>
                        </p>
                    </div>
                </div>
            </div>
            <!-- Contact Form -->
            <div class="contact-form form text-left col-md-8 col-sm-7 col-xs-12">

                <div class="input 2">
                    <?php echo do_shortcode('[caldera_form id="CF5ba3139314450"]'); ?>
                </div>

                <p class="form-messege"></p>
            </div>
        </div>
    </div>
    <div id="contact-map"></div>
</div>
<?php get_footer(  );?>