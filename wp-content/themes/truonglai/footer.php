<footer>
	<div class="footer-area overlay overlay-black overlay-70 pt-90">
		<div class="container">
			<div class="row">
				<!-- <div class="footer-widget text-left col-md-3 col-sm-6 col-xs-12">
					<div class="contact-widget">
						<h5>Địa chỉ:</h5>
						<p>
							<?php echo do_shortcode('[contact type="location_name"] '); ?>
						</p>
						<h5>Điện thoại:</h5>
						<p>
							<?php echo do_shortcode('[contact type="phone_number"] '); ?> <br />

						</p>
						<h5>e-mail</h5>
						<p>
							<?php echo do_shortcode('[contact type="email_address"] '); ?>

						</p>
					</div>
				</div> -->
				<div class="footer-widget text-left col-md-3 col-sm-6 col-xs-12">
					<?php if ( function_exists('dynamic_sidebar') ) dynamic_sidebar('Footer Sidebar 1');?>
				</div>
				<div class="footer-widget text-left col-md-3 col-sm-6 col-xs-12">
					<?php if ( function_exists('dynamic_sidebar') ) dynamic_sidebar('Footer Sidebar 2');?>
				</div>
				<div class="footer-widget text-left col-md-3 col-sm-6 col-xs-12">
					<?php if ( function_exists('dynamic_sidebar') ) dynamic_sidebar('Footer Sidebar 3');?>
				</div>
			</div>
			<div class="footer-bottom text-center col-xs-12">
				<p class="copyright">Copyright
					<?php echo wpb_copyright(); ?> Trường Cao Đẳng Cơ Điện-Xây Dựng Nông Lâm Trung Bộ-Phát triển bởi <a href="http://itajsc.com/">ITAJSC</a>
				</p>
			</div>
		</div>
	</div>
</footer>
</div>
<!-- JS -->

<script src="<?php bloginfo('template_directory')?>/js/style-customizer.js"></script>
<!-- Main JS
============================================ -->
<script src="<?php bloginfo('template_directory')?>/js/main.js"></script>

<?php wp_footer();?>

</body>

</html>