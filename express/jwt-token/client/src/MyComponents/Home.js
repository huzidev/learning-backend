import Notes from './Notes';

export const Home = (props) => {
    const {showAlert} = props // show alert is basically coming from App.js and from their we'll send the alert function to
    // NOTES since we can't directly send the alert function from App.js to Notes therefore we've to send it from their
    return (
        <div> 
            <Notes showAlert={showAlert}/>
        </div>
    )
}