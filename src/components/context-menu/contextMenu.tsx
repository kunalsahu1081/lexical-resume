import './contextMenu.css'

const ContextMenu: any = {}

ContextMenu.wrapper = ({children}) => {

    return <>

        <ul className={'contextMenu'}>

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

