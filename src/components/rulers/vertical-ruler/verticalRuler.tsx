import './v-ruler.css'
import {useContext, useEffect, useState} from "react";
import {SomeContext} from "../../../app/App.tsx";
import {$getNodeByKey, $getRoot} from "lexical";
import {$createDocNode} from "../../../features/plugins/DocumentTreeNode.ts";


const VerticalRuler = () => {

    const [isDragging, set_isDragging] = useState(false);

    const editor = useContext(SomeContext)

    const [initial_left] = useState(0);
    const [drag_id, set_drag_id] = useState('');


    useEffect(() => {

        document.addEventListener("mousemove", mouseMove);

        return () => {
            document.removeEventListener("mousemove", mouseMove);
        }

    }, [isDragging, initial_left, editor, drag_id]);

    useEffect(() => {
        console.log(editor, 'editor editor')
    }, [editor])

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

        if (e?.target.classList.contains('vrulerPoint')) {
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

            const top = Math.max(Math.round(Math.round(e.clientY - 160) - Math.round(e.clientY - 160 - segments) % 6), 0)

            box.style.top = top + 'px';

            const editor_key: any = drag_id?.slice(1, drag_id?.length);

            editor?.update(() => {
                const root = $getRoot();
                const pNode: any = $getNodeByKey(editor_key);
                if (pNode) {

                    const n_top = drag_id[0] === 't' ? top : pNode.__top;
                    const n_height = drag_id[0] === 't' ? pNode.__top - top + pNode.__height : top - pNode.__top;

                    const {node, c_key} = $createDocNode(100, n_top, n_height, 500, 'blue');
                    box.id = box.id[0] + c_key;
                    set_drag_id(box.id[0] + c_key);
                    pNode.replace(node);
                }
            })

        }
    }

    const mouseUp = (e) => {

        e.preventDefault();
        e.stopPropagation();

        if (isDragging) {
            const box = document.getElementById(drag_id) ?? {};
            set_isDragging(false);
            box.style.cursor = "pointer";
        }
        // box.classList.remove('showGuide')
    }

    useEffect(() => {

        document.addEventListener("mouseup", mouseUp);

        return (() => {
            document.removeEventListener("mouseup", mouseUp);
        })

    }, [isDragging])


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