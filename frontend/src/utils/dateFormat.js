import moment from 'moment'


export const dateFormat = (date) =>{

    return moment(new Date(date)).format('DD/MM/YYYY')

}