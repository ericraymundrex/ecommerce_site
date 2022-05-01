import "./VerticalHeader.css"

const VerticalHeader  = (props) => {
    const categories = props.categories
    return(
        <div className="Main-vertical">
            <p>Users</p>
            <div className="vertical-menu">
                <a href="/" >Profile</a>
                <a href="/">Purchases</a>
            </div>
            <p>Shop By Department</p>
            <div className="vertical-menu">
                {categories.map((item)=>(
                    <a key={item.id} href={item.value}>{item.value}</a>
                ))}
            </div>
            <p>Filters</p>
            <div className="vertical-menu">
            <a href="/" >Home</a>
                <a href="/">Filter by price</a>
                <a href="/">Filter by Brand</a>
            </div>
        </div>
    )
}

export default VerticalHeader;