import './v-ruler.css'
import {useContext, useEffect, useState} from "react";
import {SomeContext} from "../../../app/App.tsx";
import {$getNodeByKey, $getRoot} from "lexical";
import {$createDocNode} from "../../../features/plugins/DocumentTreeNode.ts";
import {boundaryKeys, nodeArray, nodeBoundaryObject} from "../../../utils/createNode.ts";


const VerticalRuler = () => {

    const [isDragging, set_isDragging] = useState(false);

    const editor = useContext(SomeContext)

    const [initial_left, set_initial_left] = useState(72);
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


        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;
        if (e?.target.classList.contains('vrulerPoint')) {

            document.body.style.overflow = 'hidden';

            window.onscroll = () => {
                window.scrollTo(scrollLeft, scrollTop);
            };

            e.preventDefault();
            e.stopPropagation();

            set_isDragging(true);
            e?.target.classList.add('showGuide')
            e.target.style.cursor = "grabbing";
            set_drag_id(e?.target?.id)
        }
    }

    const mouseMove = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const box = document.getElementById(drag_id) ?? {};


        if (isDragging) {

            const diff = Math.floor((e.clientY - 100));

            const scroll = window.scrollY;

            const segments = Math.floor(diff / 13);

            const top = Math.max(Math.round(Math.round(e.clientY - 100) - Math.round(e.clientY - 100 - segments) % 6), 0) - 72 + scroll;

            console.log(e, top);

            box.style.top = top + 72 + 'px';

            // console.log(top, e.clientY)

            const bottomNodeKeys = nodeBoundaryObject[drag_id]['down'];

            const topNodeKeys = nodeBoundaryObject[drag_id]['top'];


            editor?.update(() => {
                const root = $getRoot();

                bottomNodeKeys?.map((editor_key) => {
                    const pNode: any = $getNodeByKey(nodeArray[editor_key]);
                    if (pNode) {

                        const n_top = pNode.__top;
                        const n_height = top - pNode.__top;

                        const {
                            node,
                            c_key
                        } = $createDocNode(pNode.__left, n_top, n_height, pNode.__width, pNode.__background, true);


                        boundaryKeys[c_key] = {...boundaryKeys[nodeArray[editor_key]]};
                        delete boundaryKeys[nodeArray[editor_key]]

                        nodeArray[editor_key] = c_key;

                        root.append(node);
                        pNode.remove();
                    }
                });

                topNodeKeys?.map((editor_key) => {
                    const pNode: any = $getNodeByKey(nodeArray[editor_key]);
                    if (pNode) {

                        const n_top = top
                        const n_height = pNode.__top - top + pNode.__height;

                        const {
                            node,
                            c_key
                        } = $createDocNode(pNode.__left, n_top, n_height, pNode.__width, pNode.__background);

                        // nodeArray[editor_key] = c_key;

                        boundaryKeys[c_key] = {...boundaryKeys[nodeArray[editor_key]]};
                        delete boundaryKeys[nodeArray[editor_key]]

                        nodeArray[editor_key] = c_key;

                        root.append(node);
                        pNode.remove();
                    }
                });
            })

        }
    }

    const mouseUp = (e) => {


        document.body.style.overflow = 'scroll';
        window.onscroll = null;

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

    useEffect(() => {
        // set_initial_left(document.getElementById('vhorizontalrule')?.getBoundingClientRect()?.top)
    }, []);


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