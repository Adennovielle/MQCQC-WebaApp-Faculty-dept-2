class FilterSearch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="faculty-filter-search-box">
        <div class="filter-header-box">
          <h4>FILTER</h4>
        </div>
        <div class="filter-form-box">
  
<form id="courseForm">
  <div class="input-with-icon-box">
    <i class="fa-solid fa-magnifying-glass"></i>
  <input type="text" placeholder="Search..." class="relative-input">
  </div>
  <div class="select-and-btn-box">
  <select id="select-course" name="select-course">
    <option value="" disabled selected>Course</option>
    <option value="bsit">BSIT - Bachelor of Science in Information Technology</option>
    <option value="bsba">BSBA - Bachelor of Science in Business Administration</option>
    <option value="bshm">BSHM - Bachelor of Science in Hospitality Management</option>
    <option value="beed">BEED - Bachelor of Elementary Education</option>
    <option value="bsa">BSA - Bachelor of Science in Accountancy</option>
    <option value="bscrim">BSCRIM - Bachelor of Science in Criminology</option>
    <option value="bspysch">BSPsych - Bachelor of Science in Psychology</option>
  </select>

   <select id="select-year" name="select-year">
    <option value="" disabled selected>Year</option>

    <option value="1st">1st Year</option>
    <option value="2nd">2nd Year</option>
    <option value="3rd">3rd Year</option>
    <option value="4th">4th Year</option>
  </select>
  <button type="submit" class="submit-btn">Filter</button>
  </div>
</form>


          </form>
        </div>
      </div>
        `;
  }
}

customElements.define("faculty-filter-and-search", FilterSearch);
