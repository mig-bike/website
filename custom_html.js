class customHeader extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    <nav class="header">
        <div class="welcome">Learning Tools</div>
        <div class="header-link-cont">
          <div class="header-link"><a>HOME</a></div>
          <div class="header-link"><a>ABOUT</a></div>
          <div class="header-link"><a>CONTACT</a></div>
          <div class="header-link" href="/login.html"><a>LOGIN/REGISTER</a></div>
        </div>
      </nav>
    `;
  }
}

class customFooter extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
      <footer>
        <div class="icons">
          <a href="https://www.google.com/?safe=active&ssui=on"
            ><img
              src="images/email.png"
              style="
                margin-left: 10px;
                margin-right: 20px;
                border-radius: 10px;
              "
          /></a>
          <a href="https://www.instagram.com/"
            ><img src="images/Instagram_icon.png.webp"
          /></a>
          <a href="https://www.linkedin.com/">
            <img src="images/linkedin.png" style="margin-left: 20px" />
          </a>
        </div>
      </footer>
      `;
  }
}

customElements.define('custom-header', customHeader);
customElements.define('custom-footer', customFooter);