import React from 'react'
import'./footer.css'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div class="footer">
	<div class="container">		
		<div class="row text-center">						
			<div class="col-lg-12 col-sm-12 col-xs-12">
				<div class="footer_menu">
					<ul>
					<li>
                <Link  to="/">Home</Link>
              </li>
						<li>
                    <Link  to="/services">Services</Link>
                  </li>
                  <li>
                    <Link  to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/ourdocters">Doctors</Link>
                  </li>
                 
					</ul>
				</div>						
				<div class="footer_copyright">
					<p>&copy; AniMaux {new Date().getFullYear()} All Rights Reserved.</p>
				</div>	
				<div class="footer_profile">
					
				</div>						
			</div>					
		</div>			
	</div>
</div>
  )
}

export default Footer
