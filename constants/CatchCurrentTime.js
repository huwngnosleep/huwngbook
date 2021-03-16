export default () => {
    return `${new Date().toTimeString().slice(0, 8)} ${new Date().toDateString()}`
}