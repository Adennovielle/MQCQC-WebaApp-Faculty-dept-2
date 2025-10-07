import "../../components/faculty-navbar.js";
import "../../components/faculty-sidebar.js";
import "../../components/faculty-user-and-notification.js";
import "../../components/faculty-small-filter-search.js";

//----------FILE TABLE POST REQUEST-----------------
const reFreshButton = document.querySelector(".refresh-button");
const uploadButton = document.querySelector(".upload-button");
const fileList = document.querySelector(".file-list");
const fileInput = document.getElementById("fileInput");
const fileCompletedStatus = document.querySelector(".file-completed-status");
const facultyFileUploaderModal = document.querySelector(
  ".faculty-file-uploder-modal"
);
const facultyFileUploadArea = document.querySelector(
  ".faculty-file-upload-area"
);
const closeButton = document.querySelector(".close-button");

// Map to store active uploads with their controllers
const uploadControllers = new Map();

reFreshButton.addEventListener("click", () => {
  location.reload();
});

// ===== Drag and drop + click events =====
facultyFileUploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  facultyFileUploadArea.classList.add("active");
});

facultyFileUploadArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  facultyFileUploadArea.classList.remove("active");
});

facultyFileUploadArea.addEventListener("click", () => fileInput.click());

uploadButton.addEventListener("click", () =>
  facultyFileUploaderModal.classList.add("active")
);
closeButton.addEventListener("click", () => {
  facultyFileUploaderModal.classList.remove("active");
  fileList.innerHTML = "";
  completedFiles = 0;
  totalFilesToUpload = 0;
  updateFileCompletedStatus();
});

facultyFileUploaderModal.addEventListener("click", function (event) {
  if (event.target === this) this.classList.remove("active");
  completedFiles = 0;
  totalFilesToUpload = 0;
  updateFileCompletedStatus();
});

fileInput.addEventListener("change", (e) =>
  handleSelectedFiles(e.target.files)
);

facultyFileUploadArea.addEventListener("drop", function (e) {
  e.preventDefault();
  facultyFileUploadArea.classList.remove("active");
  handleSelectedFiles(e.dataTransfer.files);
});

// ===== Handle files =====
let totalFilesToUpload = 0;
let completedFiles = 0;

function handleSelectedFiles([...files]) {
  if (files.length === 0) return;

  totalFilesToUpload += files.length;
  updateFileCompletedStatus();

  files.forEach((file, index) => {
    const uniqueIdentifier = Date.now() + "-" + index;
    const fileItemHTML = createFileItemHTML(file, uniqueIdentifier);
    fileList.insertAdjacentHTML("beforeend", fileItemHTML);
    handleFileUploading(file, uniqueIdentifier);
  });
}

function createFileItemHTML(file, uniqueIdentifier) {
  const { name, size } = file;
  const fileSizeMB = (size / (1024 * 1024)).toFixed(2);

  return `
      <li class="file-item" id="file-item-${uniqueIdentifier}" data-id="${uniqueIdentifier}">
        <div class="file-descriptions">
          <span class="file-name">${name}</span>
          <div class="file-size">
            <span>0 MB</span> / <span>${fileSizeMB} MB</span>
          </div>
          <small class="middle-dot"></small>
          <small class="file-status" style="color:#007bff;">Uploading...</small>
          <small class="file-item-close-btn"><i class="fa-solid fa-xmark"></i></small>
        </div>
        <div class="file-progress-bar">
          <div class="file-progress"></div>
        </div>
      </li>
    `;
}

// ===== Upload and cancel logic =====
function handleFileUploading(file, uniqueIdentifier) {
  const formData = new FormData();
  formData.append("files", file);

  // Create abort controller for this upload
  const controller = new AbortController();
  uploadControllers.set(uniqueIdentifier, controller);

  axios
    .post("http://localhost:3001/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      signal: controller.signal,
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        const fileItem = document.getElementById(
          `file-item-${uniqueIdentifier}`
        );
        if (fileItem) {
          const progressBar = fileItem.querySelector(".file-progress");
          const fileSizeElement = fileItem.querySelector(".file-size span");
          const fileStatusElement = fileItem.querySelector(".file-status");
          const cancelBtn = fileItem.querySelector(".fa-xmark");

          if (progressBar) progressBar.style.width = `${percentCompleted}%`;

          if (fileSizeElement) {
            const uploadedSizeMB = (
              progressEvent.loaded /
              (1024 * 1024)
            ).toFixed(2);
            fileSizeElement.textContent = `${uploadedSizeMB} MB`;
          }

          if (fileStatusElement && percentCompleted === 100) {
            fileStatusElement.textContent = "Completed";
            fileStatusElement.style.color = "#28A745";
            cancelBtn.style.opacity = "0";
            cancelBtn.style.pointerEvents = "none";
            completedFiles += 1;
            updateFileCompletedStatus();
          }
        }
      },
    })
    .then((response) => {
      console.log("✅ Upload success:", response.data);
      uploadControllers.delete(uniqueIdentifier);
    })
    .catch((error) => {
      const fileItem = document.getElementById(`file-item-${uniqueIdentifier}`);
      const fileStatusElement = fileItem.querySelector(".file-status");

      if (error.name === "CanceledError" || error.message === "canceled") {
        fileStatusElement.textContent = "Canceled";
        fileStatusElement.style.color = "#dc3545";
        console.warn("❌ Upload canceled:", file.name);
      } else {
        fileStatusElement.textContent = "Error";
        fileStatusElement.style.color = "#dc3545";
        console.error("❌ Upload failed:", error);
      }
    });

  // Attach cancel click handler
  setTimeout(() => {
    const cancelBtn = document.querySelector(
      `#file-item-${uniqueIdentifier} .fa-xmark`
    );
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        const controller = uploadControllers.get(uniqueIdentifier);
        if (controller) {
          controller.abort(); // stop upload
          uploadControllers.delete(uniqueIdentifier);
        }
      });
    }
  }, 0);
}

// ===== Update completed files count =====
function updateFileCompletedStatus() {
  fileCompletedStatus.textContent = `${completedFiles}/${totalFilesToUpload} Files Completed`;
}

//----------FILE TABLE GET REQUEST-----------------
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:3001/files");
    const files = response.data;

    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    files.forEach((file) => {
      const name = file.original_name || "Unknown";

      // icon detection
      let iconClass = "fa-file";
      const lowerName = name.toLowerCase();
      if (lowerName.endsWith(".pdf")) iconClass = "fa-file-pdf";
      else if (lowerName.endsWith(".jpg") || lowerName.endsWith(".png"))
        iconClass = "fa-image";
      else if (lowerName.endsWith(".mp4")) iconClass = "fa-video";
      else if (lowerName.endsWith(".doc") || lowerName.endsWith(".docx"))
        iconClass = "fa-file-word";
      else if (lowerName.endsWith(".xls") || lowerName.endsWith(".xlsx"))
        iconClass = "fa-file-excel";

      // date formatting
      const date = new Date(file.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><i class="fa-solid ${iconClass}"></i><span> ${name}</span></td>
        <td>${file.owner || "Registrar"}</td>
        <td>${formattedDate}</td>
      `;

      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error("❌ Error fetching files:", error);
  }
});

//----------FILTER AND SEARCH----------------

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const searchInput = document.querySelector(
    'input[name="faculty-search-input"]'
  );
  const query = searchInput.value.trim();

  // Make an axios GET request with the search parameters
  axios
    .get(`http://localhost:3001/files/search?q=${query}`)
    .then((response) => {
      const results = response.data;
      // Update the table with the filtered files
      const tableBody = document.querySelector("table tbody");
      tableBody.innerHTML = "";

      results.forEach((file) => {
        const name = file.original_name || "Unknown";
        // icon detection
        let iconClass = "fa-file";
        const lowerName = name.toLowerCase();
        if (lowerName.endsWith(".pdf")) iconClass = "fa-file-pdf";
        else if (lowerName.endsWith(".jpg") || lowerName.endsWith(".png"))
          iconClass = "fa-image";
        else if (lowerName.endsWith(".mp4")) iconClass = "fa-video";
        else if (lowerName.endsWith(".doc") || lowerName.endsWith(".docx"))
          iconClass = "fa-file-word";
        else if (lowerName.endsWith(".xls") || lowerName.endsWith(".xlsx"))
          iconClass = "fa-file-excel";

        // date formatting
        const date = new Date(file.createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;

        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td><i class="fa-solid ${iconClass}"></i><span> ${name}</span></td>
              <td>${file.owner || "Registrar"}</td>
              <td>${formattedDate}</td>
            `;

        tableBody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("❌ Error fetching files:", error);
    });
});
