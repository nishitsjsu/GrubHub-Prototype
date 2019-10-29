import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_SECTION_DETAILS_FETCH = "succes_section_details_fetch";
export const FAILURE_SECTION_DETAILS_FETCH = "failure_section_details_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_SECTION_DETAILS_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_SECTION_DETAILS_FETCH,
        payload: response
    }
}
function sectiondetailsFetch_function(emailcookie, sectionid) {
    console.log("Data in data fecth function ")
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/sectiondetails', {
            params: {
                emailcookie: emailcookie,
                sectionid: sectionid
            }
        }).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default sectiondetailsFetch_function;