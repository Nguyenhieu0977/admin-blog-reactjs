import moment from "moment";

export default function FormatDatetime(datetime) {

    return moment(datetime).format('DD/MM/YYYY hh:mm A')
}