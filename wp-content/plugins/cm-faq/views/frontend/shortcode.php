<div class="cmfaq cmfaq-two-columns" id="cmfaq">

    <?php
    /*
     * Searchbox
     */
    CMFAQ_Frontend::the_search();
    ?>

    <div class="cmfaq-main">

        <?php
        /*
         * Frontend tiles
         */
        CMFAQ_Frontend::the_tiles();
        ?>

    </div>

    <div class="cmfaq-side">

        <?php
        /*
         * Categories list
         */
        CMFAQ_Frontend::categories();
        ?>

        <?php
        /*
         * Tag cloud
         */
        CMFAQ_Frontend::tag_cloud();
        ?>

    </div>
</div>