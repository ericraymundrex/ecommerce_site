import "./Main.css"
import Header from "../Header/Header";
import { Fragment } from "react"
import Card from "../Card/Card"
import VerticalHeader from "../VerticalHeader/VerticalHeader";

const Main = () =>{
    const categories = [{'id':1,'value':'Electronics'},
                        {'id':2,'value':'Men Fashion'},
                        {'id':3,'value':'Women Fashion'},
                        {'id':4,'value':'Mobile Phone'},
                        {'id':5,'value':'Sports Item'},
                        {'id':6,'value':'Men Footware'},
                        {'id':7,'value':'Women Footware'}]
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