import React, { useEffect, useState } from 'react'
import styles from "../Modals/FormModal.module.css"
import deleteSymbol from "../../assets/Board/delete.png"
import PriorityList from '../PriorityList/PriorityList'
import { UpdateCard, createTask } from '../../apis/tasks'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormModal(props) {

    const { modalval, data, edit, cardId, fetchData, onMenuClick, filter } = props;
    const [isExistingCard, setIsExistingCard] = useState(false || edit)
    const [checkedCount, setCheckedCount] = useState(0);

    const [checkboxes, setCheckboxes] = useState(() => {
        const initialCheckboxes = {};
        data?.tasks.forEach((task, index) => {
            initialCheckboxes[index] = task.checked || false;
        });
        setCheckedCount(data?.tasks.filter(task => task.checked).length);
        return initialCheckboxes;
    });

    const ownerId = localStorage.getItem("owner")
    const [taskData, setTaskData] = useState({
        title: "" || data?.title,
        owner: ownerId,
        priority: "" || data?.priority,
        state: data?.state || "To-do",
        dueDate: null || data?.dueDate,
        createdAt: {},
        tasks: data?.tasks || []
    })

    useEffect(() => {
        const count = Object.values(checkboxes).filter(checked => checked).length;
        setCheckedCount(count);
    }, [checkboxes]);

    useEffect(() => {
        setTaskData(prevState => ({
            ...prevState,
            tasks: data?.tasks || []
        }));
    }, [data?.tasks]);


    if (modalval || edit) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const [inputs, setInputs] = useState(data?.tasks?.length || 0);

    const AddInput = () => {
        setInputs(inputs + 1);
    };

    const deleteInput = (e) => {
        if (!inputs) return;
        const { id } = e.target;

        if (checkboxes[id]) {
            setCheckedCount(prevCount => prevCount - 1);
        }

        setCheckboxes(prevState => {
            const updatedCheckboxes = { ...prevState };
            delete updatedCheckboxes[id];
            return updatedCheckboxes;
        });

        setTaskData(prevState => {
            const newTasks = [...prevState.tasks];
            newTasks.splice(parseInt(id), 1);
            return { ...prevState, tasks: newTasks };
        });

        setInputs(prevInputs => prevInputs - 1);
    };



    const handleOnChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    const [selectedPriority, setSelectedPriority] = useState(null || data?.priority);
    const handlePriorityChange = (priority) => {
        setSelectedPriority(priority);
        setTaskData(prevState => ({
            ...prevState,
            priority
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        taskData.createdAt = new Date();

        if (isExistingCard) {
            if (!data?._id) return;
            await UpdateCard(cardId, { ...taskData });
            toast.success("Card Updated successfully");
            fetchData();
            onMenuClick();
        }
        else {
            await createTask({ ...taskData });
            toast.success("Card Created successfully");
        }
        modalval();

    };

    const handleTaskDescriptionChange = (index, value) => {
        setTaskData(prevState => {
            const newTasks = [...prevState.tasks];
            if (index >= 0 && index < newTasks.length) {
                newTasks[index] = {
                    ...newTasks[index],
                    description: value
                };
            } else {
                newTasks[index] = { description: value, checked: false };
            }
            return { ...prevState, tasks: newTasks };
        });
    };

    const handleTaskCheckedChange = (index, isChecked) => {
        setCheckboxes(prevState => ({
            ...prevState,
            [index]: isChecked
        }));

        setTaskData(prevState => {
            const newTasks = [...prevState.tasks];
            newTasks[index] = {
                ...newTasks[index],
                checked: isChecked
            };
            return { ...prevState, tasks: newTasks };
        });
        setCheckedCount(prevCount => isChecked ? prevCount + 1 : prevCount - 1);
    };

    const handleDateChange = (date) => {
        setTaskData(prevState => ({ ...prevState, dueDate: date }));
    };

    const datePickerClass = (taskData.dueDate && (taskData.dueDate < new Date())) ? styles.pastDate : styles.futureDate;

    return (
        <>
            {(modalval || isExistingCard) && (
                <div className={styles.modal}>
                    <div className={styles.overlay}></div>
                    <div className={styles.modal_content}>
                        <div className={styles.title_section}>
                            <label htmlFor={styles.card_title} id={styles.title}>Title</label>
                            <input
                                type="text"
                                id={styles.card_title}
                                placeholder='Enter Task Title'
                                name='title'
                                key={36.222}
                                value={taskData.title}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className={styles.priority}>
                            <h3 className={styles.text}>Select Priority</h3>
                            <ul className={styles.priorities} name="priority">
                                <li className={`${styles.priority_list} ${selectedPriority === "high priority" ? styles.selected : ''}`}
                                    onClick={() => handlePriorityChange("high priority")}
                                >
                                    <PriorityList priority="high priority" />
                                </li>
                                <li className={`${styles.priority_list} ${selectedPriority === "moderate priority" ? styles.selected : ''}`}
                                    onClick={() => handlePriorityChange("moderate priority")}>
                                    <PriorityList priority="moderate priority" />
                                </li>
                                <li className={`${styles.priority_list} ${selectedPriority === "low priority" ? styles.selected : ''}`}
                                    onClick={() => handlePriorityChange("low priority")}>
                                    <PriorityList priority="low priority" />
                                </li>
                            </ul>
                        </div>
                        <h3 className={styles.text}>Checklist ({checkedCount}/{inputs})</h3>
                        <div className={styles.checklist_box} >

                            {Array.from(Array(inputs)).map((c, index) => {
                                const inputId = `task_${index}`;
                                return (
                                    <div className={styles.task_input} key={inputId}>
                                        <input
                                            type="checkbox"
                                            name="index"
                                            checked={checkboxes[index] || false}
                                            onChange={(e) => handleTaskCheckedChange(index, e.target.checked)} />
                                        <input
                                            type="text"
                                            placeholder='Add a task'
                                            className={styles.input_box}
                                            name='description'
                                            id={inputId}
                                            value={taskData?.tasks[index]?.description || ''}
                                            onChange={(e) => handleTaskDescriptionChange(index, e.target.value)}
                                        >
                                        </input>
                                        <img id={index} src={deleteSymbol} alt="" onClick={(e) => deleteInput(e)} />
                                    </div>
                                );
                            })}
                            <button id={styles.add_btn} onClick={AddInput}>+ Add New</button>
                        </div>

                        <div className={styles.btns}>
                            <DatePicker
                                id={styles.date_btn}
                                placeholderText='Select Due Date'
                                selected={taskData.dueDate ? taskData.dueDate : null}
                                className={datePickerClass}
                                onChange={handleDateChange}
                                dateFormat="MMM do"
                                name='dueDate'
                            />
                            <button id={styles.cancel_btn} onClick={props.modalval}>Cancel</button>
                            <button id={styles.save_btn} onClick={(e) => { handleSubmit(e) }}>Save</button>
                        </div>
                    </div>
                </div>

            )
            }
        </>
    )
}

export default FormModal