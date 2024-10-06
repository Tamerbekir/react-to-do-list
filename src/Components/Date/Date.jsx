
const DateDisplay = ({ }) => {
  // Create a new Date object for the current date
  const today = new Date();

  // Define options for the toLocaleDateString method
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date using toLocaleDateString
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div className="dateDiv">
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateDisplay;