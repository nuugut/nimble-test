import { uploadKeywords, fetchCSV } from '../../api/dataAPI'

export const CSV_FETCHED = 'uploadCSV/CSV_FETCHED'
export const FETCHING_CSV = 'uploadCSV/FETCHING_CSV'
export const UPLOADING = 'uploadCSV/UPLOADING'
export const UPLOADED = 'uploadCSV/UPLOADED'
export const UPLOAD_UNAUTHORIZED = 'uploadCSV/UPLOAD_UNAUTHORIZED'

export const onUpload = (file) => dispatch => {
    dispatch({ type: UPLOADING })

    let fr = new FileReader();
        fr.onload = (e) => {
            const keywords = (e.target.result).replace(/\n/g, ",").split(",")
            const filterdKeywords = keywords.filter(keyword => keyword.length > 0)
            uploadKeywords(file.name, filterdKeywords).then((result => {
                if(result.statusCode === 200) {
                    dispatch({ type: UPLOADED })
                    window.location.href = "/"
                }
                else if(result.statusCode === 401) {
                    dispatch({ type: UPLOAD_UNAUTHORIZED })
                    localStorage.removeItem('token')
                    window.location.href = "/login"
                }
            }))
        };
        fr.readAsText(file);
}

export const fetchCSVAction = () => dispatch => {
    dispatch({ 
        type: FETCHING_CSV,
        payload: true
     })
    fetchCSV().then(result => {
        let csvList = []
        result.map(csv => {
            csvList.push({
                fileId: csv[0],
                filename: csv[1],
                keywords: csv[2],
                created: csv[3],
                status: csv[4]
            })
        })
        dispatch({
            type: CSV_FETCHED,
            payload: csvList
        })
    })
}