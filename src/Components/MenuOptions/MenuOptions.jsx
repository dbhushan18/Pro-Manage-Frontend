// OptionsMenu.jsx
import React, { useState } from 'react';
import styles from "../MenuOptions/MenuOptions.module.css";
import moreIcon from "../../assets/Board/3dots.png"
import FormModal from '../Modals/FormModal';
import { DeleteCard } from '../../apis/tasks';
import Modal from '../Modals/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MenuOptions({ cardId, data, onMenuClick, isOpen, fetchData}) {
    const [isEditable, setIsEditable] = useState(false);

    const openFormModal = () => {
        setIsEditable(!isEditable);
    };

    const currentUrl = window.location.href
    const handleShareClick = () => {
        const cardUrl = generateCardUrl(cardId);
        copyToClipboard(cardUrl);
    };

    const generateCardUrl = (cardId) => {
        return `${currentUrl}/card/${cardId}`;
    };

    const copyToClipboard = (text) => {
        const link = navigator.clipboard.writeText(text)
            .then(() => toast.success('Link copied to clipboard',link))
            .catch((error) => toast.error('Failed to copy link:', error));
            onMenuClick();
    };

    const [modalvalue, setModalValue] = useState(false);

    const deleteModal = () => {
        setModalValue(!modalvalue)
    };

    const handleConfirmDelete = async () => {
        await DeleteCard(cardId);
        setModalValue(false);
        fetchData();
    };

    return (
        <>
       
        <div className={styles.options_menu}>
                <img
                    src={moreIcon}
                    alt="More"
                    className={styles.more_icon}
                    onClick={onMenuClick}
                />
        
            {isOpen && (
                <ul className={styles.menu_items}>
                    <li onClick={openFormModal}>Edit</li>
                    {isEditable && <FormModal data={data} modalval={openFormModal} cardId={cardId} edit="true" fetchData={fetchData} onMenuClick={onMenuClick}/>}
                    <li onClick={handleShareClick}>Share</li>
                    <li id={styles.delete_btn} onClick={deleteModal}>Delete</li>
                </ul>
            )}
            {modalvalue && (
                <Modal
                    title_text="Are you sure want to Delete?"
                    btn1_text="Yes, Delete"
                    btn2_text="Cancel"
                    modalval={deleteModal}
                    onConfirm={handleConfirmDelete}
                />
            )}

        </div>
        </>
    );
}

export default MenuOptions;
