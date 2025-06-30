import './ruler.css'
import {useEffect, useState} from "react";


const HorizontalRuler = () => {

    const [left, set_left] = useState<number>()

    const [isDragging, set_isDragging] = useState(false);

    const [initial_left, set_initial_left] = useState(0);
    const [drag_id, set_drag_id] = useState('');


    useEffect(() => {

        document.addEventListener("mousemove", mouseMove);

        return () => {
            document.removeEventListener("mousemove", mouseMove);
        }

    }, [isDragging, initial_left]);

    useEffect(() => {

        const box = document.getElementById('leftdrag') ?? {};
        const box2 = document.getElementById('rightdrag') ?? {};

        box.addEventListener("mousedown", mouseDown);
        box2.addEventListener("mousedown", mouseDown);

        return () => {
            box.removeEventListener('mousedown', mouseDown);
            box2.addEventListener("mousedown", mouseDown);
        }

    }, []);

    useEffect(() => {
        console.log(isDragging)
    }, [isDragging])

    const mouseDown = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const box = document.getElementById('leftdrag') ?? {};
        const box2 = document.getElementById('rightdrag') ?? {};

        if (e?.target === box) {
            set_isDragging(true);
            box.classList.add('showGuide')
            box.style.cursor = "grabbing";
            set_drag_id('leftdrag')
        } else {
            set_isDragging(true);
            box2.classList.add('showGuide')
            set_drag_id('rightdrag')
            box2.style.cursor = "grabbing";
        }


    }

    const mouseMove = (e) => {

        const box = document.getElementById(drag_id) ?? {};

        if (isDragging) {

            const diff = Math.floor((e.clientX - initial_left));

            const segments = Math.floor(diff / 13);

            console.log(diff, segments);

            box.style.left = Math.max(Math.round(Math.round(e.clientX - initial_left) - Math.round(e.clientX - initial_left - segments) % 6), 0) + 'px';
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

        set_initial_left(document?.getElementById('leftdrag')?.getBoundingClientRect()?.left)

        document.addEventListener("mouseup", mouseUp);

        return (() => {
            document.removeEventListener("mouseup", mouseUp);
        })

    }, [])


    return <div id={'horizontalrule'} className={'rulerHorizontal'}>

        <div id={'leftdrag'} style={{left: left}} className={'rulerPoint'}></div>

        <div id={'rightdrag'} style={{left: left}} className={'rulerPoint'}></div>

        <div className={'rulerFace'}>

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

        <div className={'rulerNum'}
             style={{left: ((ruler_number - 1) * 96) + 24 + (ruler_number - 1) * 8 + 2}}>{ruler_number}</div>

        <div className={'largeSeg'} style={{left: ((ruler_number - 1) * 96)}}/>

        <div className={'smallSeg'} style={{left: ((ruler_number - 1) * 96) + 12}}/>

        <div className={'smallSeg'} style={{left: ((ruler_number - 1) * 96) + 24}}/>

        <div className={'smallSeg'} style={{left: ((ruler_number - 1) * 96) + 36}}/>

        <div className={'largeSeg'} style={{left: ((ruler_number - 1) * 96) + 48}}/>


        <div className={'smallSeg'} style={{left: ((ruler_number - 1) * 96) + 60}}/>

        <div className={'smallSeg'} style={{left: ((ruler_number - 1) * 96) + 72}}/>

        <div className={'smallSeg'} style={{left: ((ruler_number - 1) * 96) + 84}}/>


    </>


}

export default HorizontalRuler;