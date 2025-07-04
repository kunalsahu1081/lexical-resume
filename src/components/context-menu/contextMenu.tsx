import './contextMenu.css'

const ContextMenu: any = {}

ContextMenu.wrapper = ({children, is_visible, left, top}) => {

    return <>

        <ul style={{left: left, top: top}} className={`contextMenu ${is_visible ? 'showContextMenu' : ''}`}>

            {children}

        </ul>

    </>

}

ContextMenu.item = ({children, onClick}) => {

    return <>

        <li onClick={onClick} className={'contextItem'}>

            {children}

        </li>


    </>

}

export default ContextMenu;

