import "./Main.css"
import Header from "../Header/Header";
import { Fragment } from "react"
import Card from "../Card/Card"

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
        <div className="Main-vertical">
            <p>Users</p>
            <div className="vertical-menu">
                <a href="/" >Home</a>
                <a href="/">Link 1</a>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
                <a href="/">Link 4</a>
                <a href="/">Link 5</a>
            </div>
            <p>Categories</p>
            <div className="vertical-menu">
                {categories.map((item)=>(
                    <a key={item.id} href={item.value}>{item.value}</a>
                ))}
            </div>
            <p>Filters</p>
            <div className="vertical-menu">
            <a href="/" >Home</a>
                <a href="/">Link 1</a>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
            </div>
        </div>
        <Card/>
    </div>

</Fragment>
);
};

export default Main;