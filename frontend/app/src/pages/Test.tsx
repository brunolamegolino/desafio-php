import { Carousel } from "react-responsive-carousel";


export default function Test() {
    const imagePath = '64ae0d5bb7dd6.jpeg'

    return (
        <div className="flex flex-col p-2 m-auto max-w-4xl min-h-0 max-h-full">
            <Carousel className="contents">
                <div>
                    <img src={'http://localhost:8080/image/'+imagePath} alt="random2"/>
                </div>
                <div>
                    <img src={'http://localhost:8080/image/64ae0d5c61c63.jpeg'} alt="random"/>
                </div>
            </Carousel>    
        </div>
    )
}