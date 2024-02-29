import React, { useEffect, useState } from 'react'
import styles from "../Card/Card.module.css"
import PriorityList from '../PriorityList/PriorityList'
import expand from "../../assets/Board/collapseUp.png"
import collapse from "../../assets/Board/collapseDown.png"
import MenuOptions from "../MenuOptions/MenuOptions"
import { v4 as uuidv4 } from 'uuid';
import { getAllTasks, changeCardState, updateTaskCheckedState } from '../../apis/tasks'

function Card({ board_title, collapsed, filter }) {
    const chips_data = ["In Progress", "Backlog", "To-do", "Done"];
    const [cardData, setCardData] = useState([]);

    const [collapsedTasks, setCollapsedTasks] = useState({});

    const toggleCollapseTasks = (cardId) => {
        setCollapsedTasks({
            ...collapsedTasks,
            [cardId]: !collapsedTasks[cardId]
        });
    };

    const newArr = chips_data.filter((chip) => chip !== board_title);
    useEffect(() => {
        fetchAllTasks();
    }, [])

    const fetchAllTasks = async () => {
        try {
            const ownerId = localStorage.getItem("owner")
            if (!ownerId) return;
            const tasksData = await getAllTasks(ownerId, filter);
            setCardData(tasksData);
        }
        catch (err) {
            console.log(err)
        }
    }

    let newCardData;
    if (cardData) {
        newCardData = Object?.values(cardData)?.filter(card => card.state === board_title) || [];
    }

    //to move cards according to its state manually
    const moveCards = async (e, cardId) => {
        const newState = e.target.id;
        if (!newState) return;
        await changeCardState(cardId, newState);
        setCardData(prevCardData => {
            return prevCardData.map(card => {
                if (card._id === cardId) {
                    return { ...card, state: newState };
                }
                return card;
            });
        });
        window.location.reload();
    }

    const [openMenuId, setOpenMenuId] = useState(null);

    const handleMenuClick = (cardId) => {
        setOpenMenuId(cardId === openMenuId ? null : cardId);
    };

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

    //to change checkbox checked value
    const handleCheckboxChange = async (taskId, cardId) => {
        try {
            const updatedCardData = [...cardData];
            const cardIndex = updatedCardData.findIndex(card => card._id === cardId);

            const taskIndex = updatedCardData[cardIndex].tasks.findIndex(task => task._id === taskId);

            const updatedTaskData = { ...updatedCardData[cardIndex].tasks[taskIndex] };
            updatedTaskData.checked = !updatedTaskData.checked;
            updatedCardData[cardIndex].tasks[taskIndex] = updatedTaskData;
            setCardData(updatedCardData);
            await updateTaskCheckedState(cardId, taskId, updatedTaskData.checked);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {cardData && Object?.values(newCardData)?.map((card) => {
                const isCollapsed = collapsedTasks[card._id] || collapsed;

                return (
                    <div className={styles.card} key={uuidv4()}>
                        <div className={styles.card_top}>
                            <div className={styles.card_labels}>
                                <div className={styles.priority}><PriorityList priority={card.priority} /></div>
                                <MenuOptions cardId={card._id} data={card} filter={filter}
                                    onMenuClick={() => handleMenuClick(card._id)}
                                    isOpen={openMenuId === card._id}
                                    fetchData={fetchAllTasks}
                                />
                            </div>
                        </div>
                        <h2 id={styles.card_title}>{card.title}</h2>
                        <div className={styles.checklist_top}>
                            <p id={styles.checklist_count}>Checklist ({card.tasks.filter(task => task.checked).length}/{card.tasks.length})</p>
                            <img src={(isCollapsed) ? collapse : expand}
                                alt="toggle-collapse"
                                className={styles.collapse_icon}
                                onClick={() => toggleCollapseTasks(card._id)} />
                        </div>
                        {(!isCollapsed) && card?.tasks?.map((taskItem, index) => {
                            return (
                                <div className={styles.checklist_items} key={uuidv4()}>
                                    <input
                                        type="checkbox"
                                        name='checkbox'
                                        className={styles.checkbox}
                                        defaultChecked={taskItem.checked}
                                        onChange={() => handleCheckboxChange(taskItem._id, card._id, index)}
                                    />
                                    <p className={styles.description}>{taskItem.description}</p>
                                </div>
                            )
                        }
                        )}

                        <div className={styles.date_chips}>
                            <div className={`${styles.showDate} ${getDateClass(card?.dueDate, card.state)}`}>
                                {card?.dueDate && new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>

                            <div className={styles.state_chips}>
                                {newArr.map((chip) => {
                                    return (
                                        <span
                                            id={chip}
                                            className={styles.chip}
                                            key={uuidv4()}
                                            onClick={(e) => moveCards(e, card._id)}
                                        >{chip}</span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default Card