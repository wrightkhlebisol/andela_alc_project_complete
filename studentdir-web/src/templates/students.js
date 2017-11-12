const renderStudents = students => {
  return students.map(students => {
    let done = students.done ? "ios-checkmark" : "ios-circle-outline";
    return `<li class="item item-icon-left item-button-right">
      <i class="icon ion-${done}" data-done
        data-students-done="${students.done ? 'done' : ''}"
        data-students-id="${students.id}"></i>
      ${students.title}
      <button data-remove data-students-id="${students.id}"
        class="button button-assertive">
        <i class="ion-trash-a"></i>
      </button>
    </li>`;
  }).join("");
};
exports.render = students => {
  if (students && students.length) {
    return `<ul class="list">${renderStudents(students)}</ul>`;
  }
  return `<h4 class="text-center">The students list is empty</h4>`;
};