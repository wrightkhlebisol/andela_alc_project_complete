exports.render = path => {
  let isStudents = path === "students" ? "active" : "";
  let isStudentsForm = path === "studentsForm" ? "active" : "";
  let isUser = path === "user" ? "active" : "";
  return `
    <div class="tabs-striped tabs-color-calm">
      <div class="tabs">
        <a data-path="students" class="tab-item ${isStudents}">
          <i class="icon ion-home"></i>
        </a>
        <a data-path="studentsForm" class="tab-item ${isStudentsForm}">
          <i class="icon ion-compose"></i>
        </a>
        <a data-path="user" class="tab-item ${isUser}">
          <i class="icon ion-person"></i>
        </a>
        <a data-logout class="tab-item">
          <i class="icon ion-android-exit"></i>
        </a>
      </div>
    </div>`;
};