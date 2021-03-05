# carousel
</br>

##  [Demo](https://zen-dijkstra-55bb15.netlify.app/)
</br>

## Development


Want to run demos locally
```
git clone https://github.com/andreiGadjylaJS/carousel.git
npm install
npm start
open http://localhost:3000
```

## Example
```JavaScript
const slides = [
    {
        id: 1,
        url: image1,
    },
    {
        id: 2,
        url: image2,
    },
    {
        id: 3,
        url: image3,
    },
    {
        id: 4,
        url: image4,
    },
    {
        id: 5,
        content: "hello world"
    },
    {
        id: 6,
        url: image5
    }
]

const App = () => {
    return <Slider startFrom={1} automatic={false} time={3000}>
        {
            slides.map(slide => (
                <div className='slider__slide' key={slide.id}
                    style={{ backgroundImage: slide.url ? `url(${slide.url})` : '' }}>
                    {slide.content || ''}
                </div>)
            )
        }
    </Slider>
}
```

## Props 
startFrom - takes a number, this number will be the starting slide from the entire list of slides

automatic - accepts a boolean value, which indicates whether autoscrolling is enabled or not

time - takes a number that will set the slide scroll time
