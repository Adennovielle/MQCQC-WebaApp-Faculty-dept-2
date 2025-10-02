class DropdownFilter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
              <!-------------FACULTY FILTER FOR ATTENDACE PAGE------------>
        <div class="filter-form-box">
          <form id="form">
            <div class="select-and-btn-box">
              <select id="select-course" name="select-course">
                <option value="" disabled selected>Course</option>
                <option value="bsit">
                  BSIT - Bachelor of Science in Information Technology
                </option>
                <option value="bsba">
                  BSBA - Bachelor of Science in Business Administration
                </option>
                <option value="bshm">
                  BSHM - Bachelor of Science in Hospitality Management
                </option>
                <option value="beed">
                  BEED - Bachelor of Elementary Education
                </option>
                <option value="bsa">
                  BSA - Bachelor of Science in Accountancy
                </option>
                <option value="bscrim">
                  BSCRIM - Bachelor of Science in Criminology
                </option>
                <option value="bspysch">
                  BSPsych - Bachelor of Science in Psychology
                </option>
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
        </div>
        `;
  }
}

customElements.define("faculty-dropdown-filter", DropdownFilter);
