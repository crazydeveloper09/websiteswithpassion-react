
import { API_URL } from ".";



export const fetchUserInfo = async () => {
    const user = await fetch(`${API_URL}/about`);
    const json = user.json();
 
    return json;
    
}



export const fetchProjects = async () => {
    const projects = await fetch(`${API_URL}/projects`);
    const json = projects.json();

    return json;
}

export const fetchOrders = async () => {
    const orders = await fetch(`${API_URL}/website-orders`);
    const json = orders.json()

    return json;
}