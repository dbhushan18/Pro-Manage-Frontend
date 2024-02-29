import React, { useEffect, useState } from 'react'
import styles from "../ShareCard/ShareCard.module.css"
import { getCardDetails } from '../../apis/tasks';
import { useParams } from 'react-router-dom';
import PriorityList from '../PriorityList/PriorityList';
import logo from "../../assets/Sidebar/appLogo.png"

function ShareCard() {
    const { cardId } = useParams();
    const [cardDetails, setCardDetails] = useState({});

    useEffect(() => {
        fetchCardDetails();
    }, []);

    async function fetchCardDetails() {
        try {
            const details = await getCardDetails(cardId);
            setCardDetails(details);
        } catch (error) {
            console.error('Error fetching card details:', error);
        }
    }

    const getDateClass = (dueDate, state) => {
        if (!dueDate) return;
        const today = new Date();
        const cardDueDate = dueDate ? new Date(dueDate) : null;
        if (state === 'Done') {
            return styles.doneState;
        } else if (cardDueDate && cardDueDate < today) {
            return styles.pastDate;
        } else {
            return styles.futureDate;
        }
    };

    return (
        <>
            {cardDetails && Object?.values(cardDetails)?.map((card) => {
                return (
                    <>
                        <div className={styles.card_container}>
                            <img src={logo} alt="" id={styles.logo} />

                            <div className={styles.card}>
                                <div className={styles.card_top}>
                                    <div className={styles.card_labels}>
                                        <div className={styles.priority}><PriorityList priority={card.priority} /></div>
                                    </div>
                                </div>
                                <h2 id={styles.card_title}>{card.title}</h2>
                                <div className={styles.checklist_top}>
                                    <p id={styles.checklist_count}>Checklist ({card.tasks.filter(task => task.checked).length}/{card.tasks.length})</p>
                                </div>
                                <div className={styles.checklist_section}>
                                    {card?.tasks?.map((taskItem, index) => {
                                        return (
                                            <div className={styles.checklist_items}>
                                                <input
                                                    type="checkbox"
                                                    name='checkbox'
                                                    className={`${styles.checkbox}`}
                                                    defaultChecked={taskItem.checked}
                                                    disabled
                                                />
                                                <p className={styles.description}>{taskItem.description}</p>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                                <div className={styles.date_chips}>
                                    <div className={styles.due_date_section}>
                                        {card?.dueDate && (<h3 className={styles.due_date_text}>Due Date</h3>)}
                                        <div className={`${styles.showDate} ${getDateClass(card?.dueDate, card.state)}`}>
                                            {card?.dueDate && new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}

        </>
    )
}

export default ShareCard