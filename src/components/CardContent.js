

export default function CardContent(props){
    return (
        <div className="card-content" >
            
            <div className='badge-container'>
                <p className='number-position'>{props.position}</p>
                <h3>{props.title}</h3>
            </div>
            <p>{props.name}</p>
            <p>{props.empNum}</p>
        </div>
    )
}

