import "./VerticalHeader.css"

const VerticalHeader  = (props) => {
    const categories = props.categories
    return(
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
    )
}

export default VerticalHeader;