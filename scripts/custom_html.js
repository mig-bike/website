class customHeader extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    <nav class="header">
        <div class="welcome">Learning Tools</div>
        <div class="header-link-cont">
          <a class="header-link" target="_self" href="./web.html">HOME</a>
          <a class="header-link" target="_self" href="./about.html">ABOUT</a>
          <a class="header-link" target="_self" href="./import_export.html">IMPORT/EXPORT</a>
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
              src="../images/email.png"
              style="
                margin-left: 10px;
                margin-right: 20px;
                border-radius: 10px;
              "
          /></a>
          <a href="https://www.instagram.com/"
            ><img src="../images/Instagram_icon.png.webp"
          /></a>
          <a href="https://www.linkedin.com/">
            <img src="../images/linkedin.png" style="margin-left: 20px" />
          </a>
        </div>
      </footer>
      `;
  }
}

customElements.define('custom-header', customHeader);
customElements.define('custom-footer', customFooter);