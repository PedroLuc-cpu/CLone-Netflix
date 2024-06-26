import {useState} from "react";
import './MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Movie {
    id: string;
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    name: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number
    release_date: string;
    title: string;
    video: boolean
    vote_average: number
    vote_count: number
}

interface Item {
    results: Movie[]
}

interface MovieRowProps {
    title: string;
    items: Item;
}


export default function MovieRow({title, items}: MovieRowProps){

    const [scrollX, setscrollX] = useState(0)

    const hanleleftArrow = () =>{
            let x = scrollX + Math.round(window.innerWidth / 2)
            if(x > 0){
                x=0
            }
            setscrollX(x)
    }

    const hanlerighttArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2)
        const listW = items.results.length * 150
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60
        }
        setscrollX(x)
    }

    console.log(items)
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={hanleleftArrow}>
                    <NavigateBeforeIcon style={{fontSize:50}} />
            </div>
            <div className="movieRow-right" onClick={hanlerighttArrow}>
                    <NavigateNextIcon style={{fontSize:50}}/>
            </div>

            <div className="movieRow--listarea">
                    <div className="movieRow--list" 
                    style={{marginLeft:scrollX, width: items.results.length * 150}}>
                    {items.results.length >0 && items.results.map((item, key)=>(
                    <div key={key} className="movieRow--item">
                        <img src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`} alt={item.original_title}></img>
                    </div>
                        
                ))}
                    </div>
            </div>
        </div>
    )
}