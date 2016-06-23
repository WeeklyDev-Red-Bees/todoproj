export default class HomeController {
  constructor() {
    this.name = 'Red Bees';
    this.tempName = '';
    
    console.log(this.name);
  }
  
  changeName() {
    this.name = this.tempName;
  }
}