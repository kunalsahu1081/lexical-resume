import './v-ruler.css'
import {useEffect, useState} from "react";


const VerticalRuler = () => {

    const [isDragging, set_isDragging] = useState(false);

    const [initial_left] = useState(0);
    const [drag_id, set_drag_id] = useState('');


    useEffect(() => {

        document.addEventListener("mousemove", mouseMove);

        return () => {
            document.removeEventListener("mousemove", mouseMove);
        }

    }, [isDragging, initial_left]);

    useEffect(() => {



        document.addEventListener("mousedown", mouseDown);

        return () => {
            document.removeEventListener('mousedown', mouseDown);
        }

    }, []);

    useEffect(() => {
        console.log(isDragging)
    }, [isDragging])

    const mouseDown = (e) => {

        e.preventDefault();
        e.stopPropagation();

        if (e?.target.classList.contains('rulerPoint')) {
            set_isDragging(true);
            e?.target.classList.add('showGuide')
            e.target.style.cursor = "grabbing";
            set_drag_id(e?.target?.id)
        }
    }

    const mouseMove = (e) => {

        const box = document.getElementById(drag_id) ?? {};

        if (isDragging) {

            const diff = Math.floor((e.clientY - initial_left));

            const segments = Math.floor(diff / 13);

            box.style.top = Math.max(Math.round(Math.round(e.clientY - initial_left) - Math.round(e.clientY - initial_left - segments) % 6), 0) + 'px';
        }
    }

    const mouseUp = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const box = document.getElementById(drag_id) ?? {};
        set_isDragging(false);
        box.style.cursor = "pointer";
        // box.classList.remove('showGuide')
    }

    useEffect(() => {

        document.addEventListener("mouseup", mouseUp);

        return (() => {
            document.removeEventListener("mouseup", mouseUp);
        })

    }, [])


    return <div id={'vhorizontalrule'} className={'rulerVertical'}>

        <div className={'rulerFaceVertical'}>

            <RulerSegment ruler_number={1}/>

            <RulerSegment ruler_number={2}/>

            <RulerSegment ruler_number={3}/>

            <RulerSegment ruler_number={4}/>

            <RulerSegment ruler_number={5}/>

            <RulerSegment ruler_number={6}/>

            <RulerSegment ruler_number={7}/>

            <RulerSegment ruler_number={8}/>

            <RulerSegment ruler_number={9}/>

            <RulerSegment ruler_number={10}/>

            <RulerSegment ruler_number={11}/>

            <RulerSegment ruler_number={12}/>

            <RulerSegment ruler_number={13}/>

            <RulerSegment ruler_number={14}/>

            <RulerSegment ruler_number={15}/>

            <RulerSegment ruler_number={16}/>

            <RulerSegment ruler_number={17}/>

        </div>


    </div>


}

const RulerSegment = ({ruler_number}: { ruler_number: number }) => {


    return <>


        <div className={'vlargeSeg'} style={{top: ((ruler_number - 1) * 96)}}/>

        <div className={'vsmallSeg'} style={{top: ((ruler_number - 1) * 96) + 12}}/>

        <div className={'vsmallSeg'} style={{top: ((ruler_number - 1) * 96) + 24}}/>

        <div className={'vsmallSeg'} style={{top: ((ruler_number - 1) * 96) + 36}}/>

        <div className={'vlargeSeg'} style={{top: ((ruler_number - 1) * 96) + 48}}/>


        <div className={'vsmallSeg'} style={{top: ((ruler_number - 1) * 96) + 60}}/>

        <div className={'vsmallSeg'} style={{top: ((ruler_number - 1) * 96) + 72}}/>

        <div className={'vsmallSeg'} style={{top: ((ruler_number - 1) * 96) + 84}}/>


    </>


}

export default VerticalRuler;