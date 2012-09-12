<?php
/*
Template Name: Inner-page-dream
 * 
*/
?>
    <div id="primary">
            <div id="inner-content" role="main">

                <?php while ( have_posts() ) : the_post(); ?>

                    <?php get_template_part( 'content', 'page' ); ?>

                <?php endwhile; // end of the loop. ?>
            
            </div><!-- #content -->
        </div><!-- #primary -->

<?php get_footer(); ?>