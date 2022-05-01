import "./Main.css"
import Header from "../Header/Header";
import { Fragment } from "react"
import Card from "../Card/Card"
import VerticalHeader from "../VerticalHeader/VerticalHeader";

const Main = () =>{
    const categories = [{'id':1,'value':'Mobiles, Computers'},
                        {'id':2,'value':'Electronics'},
                        {'id':3,'value':"Men's Fashion"},
                        {'id':4,'value':"Women's Fashion"},
                        {'id':5,'value':'Home, Kitchen, pets'},
                        {'id':6,'value':'Grocery'},
                        {'id':7,'value':'Toys'}]
    return(

<Fragment>
    <Header/>
    <div className="Main">
        <VerticalHeader categories={categories}/>
        <Card/>
    </div>

</Fragment>
);
};

export default Main;