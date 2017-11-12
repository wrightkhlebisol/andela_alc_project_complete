import Students from "./components/students.js";
import StudentsForm from "./components/students.js";
import User from "./components/user.js";
import Signin from "./components/signin.js";
import Signup from "./components/signup.js";
import Menu from "./components/menu.js";

class App {
  constructor(body, footer) {
    this.signin = new Signin(body);
    this.signup = new Signup(body);
    this.students = new Students(body);
    this.studentsForm = new StudentsForm(body);
    this.user = new User(body);
    this.menu = new Menu(footer);
  }
  init() {
    this.signin.render();
    this.addEventListener();
  }
  addEventListener() {
    this.signinEvents();
    this.signupEvents();
    this.studentsEvents();
    this.studentsFormEvents();
    this.userEvents();
    this.menuEvents();
  }
  signinEvents() {
    this.signin.on("error", () => alert("Authentication error"));
    this.signin.on("signin", (token) => {
      localStorage.setItem("token", `JWT ${token}`);
      this.menu.render("students");
      this.students.render();
    });
    this.signin.on("signup", () => this.signup.render());
  }
  signupEvents(){
    this.signup.on("error", () => alert("Register error"));
    this.signup.on("signup", (user) => {
      alert(`${user.name} you were registered!`);
      this.signin.render();
    });
  }
  studentsEvents() {
    this.students.on("error", () => alert("Student list error"));
    this.students.on("remove-error", () => alert("Student delete error"));
    this.students.on("update-error", () => alert("Student update error"));
    this.students.on("remove", () => this.students.render());
    this.students.on("update", () => this.students.render());
  }
  studentsFormEvents() {
    this.studentsForm.on("error", () => alert("Student register error"));
    this.studentsForm.on("submit", () => {
      this.menu.render("students");
      this.students.render();
    });
  }
  userEvents() {
    this.user.on("error", () => alert("User load error"));
    this.user.on("remove-error", () => alert("Cancel account error"));
    this.user.on("remove-account", () => {
      alert("So sad! You are leaving us :(");
      localStorage.clear();
      this.menu.clear();
      this.signin.render();
    });
}
  menuEvents() {
    this.menu.on("click", (path) => {
      this.menu.render(path);
      this[path].render();
    });
    this.menu.on("logout", () => {
      localStorage.clear();
      this.menu.clear();
      this.signin.render();
    })
  }
}
 
module.exports = App;