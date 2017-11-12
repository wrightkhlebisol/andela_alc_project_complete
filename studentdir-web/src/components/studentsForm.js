import Students from "../students.js";
import Template from "../templates/studentsForm.js";
 
class StudentsForm extends Students {
  constructor(body) {
    super();
    this.body = body;
  }
  render() {
    this.body.innerHTML = Template.render();
    this.body.querySelector("[data-students]").focus();
    this.addEventListener();
  }
  addEventListener() {
    this.formSubmit();
  }
  formSubmit() {
    const form = this.body.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const students = e.target.querySelector("[data-students]");
      const opts = {
        method: "POST",
        url: `${this.URL}/students`,
        json: true,
        headers: {
          authorization: localStorage.getItem("token")
        },
        body: {
          title: students.value
        }
      };
      this.request(opts, (err, resp, data) => {
        if (err || resp.status === 412) {
          this.emit("error");
        } else {
          this.emit("submit");
        }
      });
    });
  }
}

module.exports = StudentsForm;