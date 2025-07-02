import './ruler.css'
import {useContext, useEffect, useState} from "react";
import {nodeArray, nodeBoundaryObject, SomeContext} from "../../../app/App.tsx";
import {$getNodeByKey, $getRoot} from "lexical";
import {$createDocNode} from "../../../features/plugins/DocumentTreeNode.ts";


const HorizontalRuler = () => {


    const [isDragging, set_isDragging] = useState(false);

    const [initial_left] = useState(0);
    const [drag_id, set_drag_id] = useState('');

    const editor = useContext(SomeContext)


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

        if (e?.target.classList.contains('rulerPoint')) {
            set_isDragging(true);
            e?.target.classList.add('showGuide')
            e.target.style.cursor = "grabbing";
            set_drag_id(e?.target?.id)
        }
    }

    const mouseMove = (e) => {

        const box = document.getElementById(drag_id) ?? {};

        const Ileft = document?.getElementById('horizontalrule')?.getBoundingClientRect()?.left;

        if (isDragging) {

            const diff = Math.floor((e.clientX - initial_left));

            const segments = Math.floor(diff / 13);

            let left = Math.max(Math.round(Math.round(e.clientX - Ileft) - Math.round(e.clientX - Ileft - segments) % 6), 0);

            box.style.left = left + 'px';

            left-=10;

            const leftNodeKeys = nodeBoundaryObject[drag_id]['left'];

            const rightNodeKeys = nodeBoundaryObject[drag_id]['right'];


            editor?.update(() => {
                const root = $getRoot();

                leftNodeKeys?.map((editor_key) => {
                    const pNode: any = $getNodeByKey(nodeArray[editor_key]);
                    if (pNode) {

                        const n_left = left;
                        const n_width = pNode.__left - left + pNode.__width;

                        const {node, c_key} = $createDocNode(n_left, pNode.__top, pNode.__height, n_width, pNode.__background);

                        nodeArray[editor_key] = c_key;
                        pNode.replace(node);
                    }
                });

                rightNodeKeys?.map((editor_key) => {
                    const pNode: any = $getNodeByKey(nodeArray[editor_key]);
                    if (pNode) {

                        const n_left = pNode.__left
                        const n_width = left - pNode.__left;

                        const {node, c_key} = $createDocNode(n_left, pNode.__top, pNode.__height, n_width, pNode.__background);

                        nodeArray[editor_key] = c_key;
                        pNode.replace(node);
                    }
                });
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


    return <div id={'horizontalrule'} className={'rulerHorizontal'}>

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