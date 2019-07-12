<?php

namespace Korn\Base;

abstract Class Cpt{

    public function init() {
        
        $name = $this->get_name();
        $args = $this->post_type();

        add_action('init',function() use($name,$args) {
            register_post_type( $name, $args );
        });  

    }

    public abstract function post_type();

}

?>