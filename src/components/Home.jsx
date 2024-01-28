import React from "react";
import defaultImage from '../assets/img/costa-rica-pura-vida-1.jpg'
import '../assets/styles/home.css'
import { SwiperHome } from "./SwiperHome";

function Home() {




    return (

        <>
            <img
                src={defaultImage}
                alt={'Pura Vida!'}
                loading="lazy" 
            />
            <section className="SwiperHomeSection">
                <SwiperHome></SwiperHome>
            </section>
            

        </>
    );

}

export default Home;