import axios from 'axios';


export class PixabayAPI {
    static API_KEY = '37105589-3d487ec0acc050f78cec264eb';
    static BASE_URL = 'https://pixabay.com/api/'

    constructor() {
        this.page = null;
        this.query = null;
        this.perPage = 40;
    }

    fetchPixabay() {
        const searchParams = new URLSearchParams({
            key: PixabayAPI.API_KEY,
            q: this.query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: this.perPage,
        });

        return axios.get(`${PixabayAPI.BASE_URL}?${searchParams}`)
    }
        
}
