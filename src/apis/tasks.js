import axios from "axios"
const Backend_url = import.meta.env.VITE_BACKEND_URL


export async function createTask({ title, priority, state, dueDate, createdAt, tasks, owner }) {
    try {
        const reqUrl = `${Backend_url}/task/newTask`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const reqParams = { title, priority, state, dueDate, createdAt, tasks, owner }
        const response = await axios.post(reqUrl, reqParams)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function getAllTasks(owner,filter) {
    try {
        const reqUrl = `${Backend_url}/task/allTasks/${owner}?filter=${filter}`
        const response = await axios.get(reqUrl)
        return response?.data?.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function changeCardState(cardId, state) {
    try {
        const reqUrl = `${Backend_url}/task/tasks/${cardId}`
        const response = await axios.put(reqUrl, { state });
        return response?.data?.data;
    }
    catch (err) {
        console.log(err)
    }
}

export async function updateTaskCheckedState(cardId, taskId, checkedState ) {
    try {
        const reqUrl = `${Backend_url}/task/cards/${cardId}/tasks/${taskId}`; 
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const reqBody = { checked: checkedState };
        const response = await axios.put(reqUrl, reqBody);
        return response?.data?.data;
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateCard(cardId, { title, priority, state, dueDate, createdAt, tasks }) {
    try {
        const reqUrl = `${Backend_url}/task/edit/${cardId}`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const reqParams = { title, priority, state, dueDate, createdAt, tasks}
        const response = await axios.put(reqUrl, reqParams)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function DeleteCard(cardId){
    try {
        const reqUrl = `${Backend_url}/task/delete/${cardId}`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.delete(reqUrl)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}


export async function getCardDetails(cardId){
    try {
        const reqUrl = `${Backend_url}/task/board/card/${cardId}`
        const response = await axios.get(reqUrl)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function getTasksCounts(owner){
    try {
        const reqUrl = `${Backend_url}/task/counts/${owner}`
        const response = await axios.get(reqUrl)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
