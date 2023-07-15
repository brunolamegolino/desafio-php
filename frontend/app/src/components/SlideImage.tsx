import { Carousel } from "react-responsive-carousel"

type Props = {
    imagesPath: string
    showIndicators?: boolean
}

export default function SlideImage({imagesPath, showIndicators=true}: Props) {
    const paths = imagesPath.split(',')

    return (
        <Carousel showIndicators={showIndicators} showStatus={false} showThumbs={false} className="contents">
            {paths.map((imagePath: string, index) => 
                <div key={index}>
                    <img className="min-h-0 object-scale-down max-h-[200px]" 
                        src={'http://localhost:8080/image/'+imagePath} alt="random2"/>
                </div>)}
        </Carousel>    
    )
}