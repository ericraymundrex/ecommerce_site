import { Fragment } from "react"
import styles from "./Footer.module.css"
const Footer=()=>{
    return(
        <Fragment>
  
    <footer class={styles["site-footer"]}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">This is capestone project for Training</p>
          </div>

          <div class="col-xs-6 col-md-3">

          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>

            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class={styles["copyright-text"]}>Copyright &copy; 2017 All Rights Reserved by 
         <a href="/">Ecomsite</a>.
            </p>
          </div>

        </div>
      </div>
</footer>            
        </Fragment>
    )
}

export default Footer