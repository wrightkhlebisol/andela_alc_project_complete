import Students from "../students.js";
import Template from "../templates/students.js";
  
class Student extends Students {
  constructor(body) {
    super();
    this.body = body;
  }
  render() {
    this.renderStudentsList();
  }
  addEventListener() {
    this.studentsDoneCheckbox();
    this.studentsRemoveClick();
  }
  renderStudentsList() {
    const opts = {
      method: "GET",
      url: `${this.URL}/students`,
      json: true,
      headers: {
        authorization: localStorage.getItem("token")
      }
    };
    this.request(opts, (err, resp, data) => {
      if (err) {
        this.emit("error", err);
      } else {
        this.body.innerHTML = Template.render(data);
        this.addEventListener();
      }
    });
  }
  studentsDoneCheckbox() {
  const dones = this.body.querySelectorAll("[data-done]");
  for(let i = 0, max = dones.length; i < max; i++) {
      dones[i].addEventListener("click", (e) => {
        e.preventDefault();
        const id = e.target.getAttribute("data-students-id");
        const done = e.target.getAttribute("data-students-done");
        const opts = {
          method: "PUT",
          url: `${this.URL}/students/${id}`,
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({done: !done})
        };
        this.request(opts, (err, resp, data) => {
          if (err || resp.status === 412) {
           this.emit("update-error", err);
          } else {
            this.emit("update");
          }
        });
      });
    }
  }
 	studentsRemoveClick() {
    const removes = this.body.querySelectorAll("[data-remove]");
    for(let i = 0, max = removes.length; i < max; i++) {
      removes[i].addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Do you really wanna delete this students?")) {
          const id = e.target.getAttribute("data-students-id");
          const opts = {
            method: "DELETE",
            url: `${this.URL}/students/${id}`,
            headers: {
               authorization: localStorage.getItem("token")
            }
          };
         this.request(opts, (err, resp, data) => {
            if (err || resp.status === 412) {
              this.emit("remove-error", err);
            } else {
              this.emit("remove");
            }
          });
        }
      });
    }
  }
}

module.exports = Student;