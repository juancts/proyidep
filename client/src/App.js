import { BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import UpdatePokes from "./components/UpdatePokes/UpdatePokes";
import AddPoke from "./components/form/AddPoke";
import Home from "./components/Home/Home";
import LandingPage from "./components/landingPage/LandingPage";
import Details from "./components/Details/Details";





function App() {

 
  return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage}/>        
        <Route path="/Home" component={Home}/>
        <Route path="/allpokes" component={Cards}/>
        <Route path="/addpokes" component={AddPoke}/>
        <Route path="/updatepokes" component={UpdatePokes}/>
        <Route path="/details/:id"><Details /></Route>
        </Switch>
        </BrowserRouter>
    
  )

}

export default App;
