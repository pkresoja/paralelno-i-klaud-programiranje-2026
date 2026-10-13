import axios from "axios"
import { PostModel } from "./models/post.model"

const url = 'https://fir.singidunum.ac.rs/api/post/latest'

// fetch(url)
//     .then(rsp => rsp.json())
//     .then(data => console.log(data))

axios.get<PostModel[]>(url)
    .then(rsp => {
        for (let post of rsp.data) {
            console.log(post.title)
        }
    })