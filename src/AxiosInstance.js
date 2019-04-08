import axios from "axios";

let instance = null;
let callback = null;

export class AxiosInstance {

    static setCallback(func){
        callback = func;
    }

    static getInstance(){
        if(localStorage.getItem("accessToken")){
            instance = axios.create({
                timeout: 1000,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem("accessToken")},
                baseURL: "https://api-task-planner.herokuapp.com/api"
            });
        }else{
            localStorage.setItem("page","login");
            callback();
            instance = axios.create();
        }
        return instance;



    }

}