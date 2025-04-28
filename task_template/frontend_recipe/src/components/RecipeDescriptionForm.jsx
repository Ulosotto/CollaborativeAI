import taskService from '../services/task'

const RecipeDescriptionForm = ({ recipeDescription, setRecipeDescription, messages, isDisabled, setIsDisabled, setIsLoading, addMessage }) => {
  function parsePoetryAndComment(input) {
    // Initialize variables to store the parsed parts
    let recipe = "";
    let comment = "";
  
    // Trim the input to remove leading/trailing whitespace
    input = input.trim();
  
    // Check if the input starts with a '[' character
    if (input.startsWith('[')) {
        // Find the closing ']' character
        let endBracketIndex = input.indexOf(']');
        
        // If a closing ']' is found, extract the poetry line
        if (endBracketIndex !== -1) {
            recipe = input.substring(1, endBracketIndex).trim();
            // Extract the comment part if there is any text after the closing ']'
            if (endBracketIndex + 1 < input.length) {
                comment = input.substring(endBracketIndex + 1).trim();
            }
        }
    } else {
        // If the input doesn't start with '[', consider the whole input as a comment
        comment = input;
    }
  
    // console.log("Parsed: ", recipe, ", ", comment)
  
    return { recipe, comment };
  }
  
  function checkAndAddMessage(sender, text, comment, type) {
    text = (typeof text === 'string' && text.trim()) ? text : null;
    comment = (typeof comment === 'string' && comment.trim()) ? comment : null;
  
    if (text === null && comment === null) {
      console.log("no message");
    } else {
      addMessage({ sender: sender, text: text, comment: comment, type: "dialogue"}); 
    }
  }

  const chooseRecipeDescription = (event) => {
    if (!recipeDescription.trim()) {
      alert("Please enter the name of the recipe");
      return;
    }
    event.preventDefault();
    setIsDisabled(true);
    setIsLoading(true);

    taskService
      .submitUserInput({
        inputData: {
          comment: true,
          recipes: []
        },
        text: "Give me the recipe that I am asking for",
        objective: recipeDescription
      })
      .then((returnedResponse) => {
        let parsed = parsePoetryAndComment(returnedResponse.text)
        checkAndAddMessage("ai", parsed.recipe, parsed.comment, "dialogue")
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <>
      <div className='recipe-description-wrapper'>
        <form onSubmit={chooseRecipeDescription} className="recipe-description-input">
          <h3 style={{"maxWidth": "200px"}}>Which recipe do you need </h3>
          <input 
            type="text"
            disabled={isDisabled}
            placeholder="What recipe do you want"
            value={recipeDescription}
            onChange={(event) => setRecipeDescription(event.target.value)}
          />
          <button 
            type="button"
            disabled={isDisabled}
            className="recipe-description-submit-btn"
            onClick={chooseRecipeDescription}>
            Submit 
          </button>
        </form>
      </div>
    </>
  );
};

export default RecipeDescriptionForm;
