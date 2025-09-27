class SmallFilter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
              <!-------------FACULTY FILTER AND SEARCH CARD------------>
  <div class="faculty-filter-search-box small">
        <div class="filter-header-box">
          <h4>FILTER</h4>
        </div>
        <div class="filter-form-box">
  
<form id="form">
  <div class="input-with-icon-box">
    <i class="fa-solid fa-magnifying-glass"></i>
  <input type="text" placeholder="Search..." class="relative-input">
  </div>
  <div class="select-and-btn-box">
  <button type="submit" class="submit-btn">Search   </button>
  </div>
</form>
          </form>
        </div>
      </div>
        `;
  }
}

customElements.define("faculty-small-filter-search", SmallFilter);
